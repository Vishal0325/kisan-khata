import { getUsers } from "@/lib/queries";
import { AddUserForm } from "@/components/AddUserForm";

export default async function UsersPage() {
    let users = [];
    try {
        users = await getUsers();
    } catch {
        users = [];
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
            <main className="mx-auto max-w-2xl space-y-8 px-4 py-6 pb-24">
                <AddUserForm />

                <section>
                    <h2 className="mb-4 text-lg font-semibold text-emerald-900">
                        Staff ({users.length})
                    </h2>
                    {users.length === 0 ? (
                        <p className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center text-emerald-700">
                            No staff accounts yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {users.map((u) => (
                                <div
                                    key={u.id}
                                    className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium text-emerald-900">{u.name}</p>
                                        <p className="text-xs text-emerald-700/80">{u.mobile_number}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
