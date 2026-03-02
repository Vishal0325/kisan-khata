#!/usr/bin/env node
/**
 * Safe migration runner for local/Supabase Postgres.
 *
 * Usage:
 *   DATABASE_URL="postgres://..." node scripts/run_migrations_safe.js
 *
 * To skip the interactive confirmation set SKIP_CONFIRM=1
 */

const { Client } = (() => {
  try {
    return require('pg');
  } catch (err) {
    console.error('\nMissing dependency: please run `npm install pg` first.');
    process.exit(1);
  }
})();
const readline = require('readline');

const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
if (!dbUrl) {
  console.error('Please set DATABASE_URL or SUPABASE_DB_URL environment variable to your Postgres connection string.');
  process.exit(1);
}

async function confirmPrompt(message) {
  if (process.env.SKIP_CONFIRM === '1') return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(message + ' (type YES to continue): ', (ans) => {
      rl.close();
      resolve(ans === 'YES');
    });
  });
}

async function run() {
  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  console.log('\nSafe migration runner starting — no destructive deletes will be performed.');

  const ok = await confirmPrompt('\nThis will ALTER the `transactions` table (add/migrate/drop columns, create FK/index). Continue?');
  if (!ok) {
    console.log('Aborted by user.');
    await client.end();
    process.exit(0);
  }

  try {
    await client.query('BEGIN');

    // Check columns
    const colRes = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='transactions' AND column_name IN ('user_id', 'created_by_user_id')`
    );
    const cols = colRes.rows.map((r) => r.column_name);

    if (!cols.includes('user_id')) {
      console.log('Adding `user_id` column to `transactions` (type: uuid)');
      await client.query(`ALTER TABLE transactions ADD COLUMN IF NOT EXISTS user_id uuid`);
    } else {
      console.log('`user_id` column already exists.');
    }

    if (cols.includes('created_by_user_id')) {
      console.log('Migrating values from `created_by_user_id` to `user_id` where `user_id` is NULL.');
      await client.query(
        `UPDATE transactions SET user_id = created_by_user_id WHERE user_id IS NULL AND created_by_user_id IS NOT NULL`
      );

      console.log('Dropping legacy column `created_by_user_id`.');
      await client.query(`ALTER TABLE transactions DROP COLUMN IF EXISTS created_by_user_id`);
    } else {
      console.log('No `created_by_user_id` column found — nothing to migrate/drop.');
    }

    // Add FK if users table exists
    const usersTable = await client.query(`SELECT to_regclass('public.users') as exists`);
    if (usersTable.rows[0] && usersTable.rows[0].exists) {
      const fkCheck = await client.query(`
        SELECT tc.constraint_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_name = kcu.table_name
        JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
        WHERE tc.table_name = 'transactions' AND tc.constraint_type = 'FOREIGN KEY'
          AND kcu.column_name = 'user_id' AND ccu.table_name = 'users'
      `);

      if (fkCheck.rows.length === 0) {
        console.log('Adding foreign key constraint transactions.user_id -> users.id (ON DELETE SET NULL)');
        await client.query(`ALTER TABLE transactions ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL`);
      } else {
        console.log('Foreign key constraint for transactions.user_id -> users.id already exists.');
      }
    } else {
      console.log('Users table not found — skipping FK creation.');
    }

    // Ensure index
    console.log('Ensuring index on transactions(user_id)');
    await client.query(`CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id)`);

    await client.query('COMMIT');
    console.log('\nMigration completed successfully.');
  } catch (err) {
    console.error('Migration failed — rolling back. Error:', err.message || err);
    try {
      await client.query('ROLLBACK');
    } catch (rerr) {
      console.error('Rollback failed:', rerr.message || rerr);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

run().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});