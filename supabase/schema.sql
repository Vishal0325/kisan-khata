-- Kisan Uddhar Database Schema
-- Run this in your Supabase SQL Editor to create the tables

CREATE TABLE IF NOT EXISTS farmers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  village TEXT NOT NULL,
  aadhar_no TEXT DEFAULT '',
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Run this to add new columns if farmers table already exists:
-- ALTER TABLE farmers ADD COLUMN IF NOT EXISTS aadhar_no TEXT DEFAULT '';
-- ALTER TABLE farmers ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Create farmer-photos storage bucket in Supabase Dashboard: Storage > New Bucket > "farmer-photos" > Public

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('DEBIT', 'CREDIT')),
  amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
  note TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- user/staff table for multi‑user login
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mobile_number TEXT UNIQUE NOT NULL,
  pin TEXT NOT NULL, -- 4‑digit PIN
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for development (replace with proper auth policies for production)
CREATE POLICY "Allow all on farmers" ON farmers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on transactions" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on vendors" ON vendors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on users" ON users FOR ALL USING (true) WITH CHECK (true);

// queries.ts
export async function authenticateUser(
  mobile_number: string,
  pin: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("mobile_number", mobile_number)
    .eq("pin", pin)
    .single();
  return error ? null : (data as User);
}

useEffect(() => {
  const stored = localStorage.getItem("kk_user");
  if (stored) setUser(JSON.parse(stored));
  setMounted(true);
}, []);

const login = (u: User) => {
  setUser(u);
  localStorage.setItem("kk_user", JSON.stringify(u));
};

const { user } = useAuth();

return (
  <form …>
    <input type="hidden" name="farmer_id" value={farmerId} />
    {user && <input type="hidden" name="created_by_user_id" value={user.id} />}
    …
  </form>
);
