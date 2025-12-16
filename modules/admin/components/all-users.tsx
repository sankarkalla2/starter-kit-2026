import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UsersTable } from "./users-table";

export default async function AllUsers() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session == null) return redirect("/auth/login");
  const hasAccess = await auth.api.userHasPermission({
    headers: await headers(),
    body: { permission: { user: ["list"] } },
  });
  if (!hasAccess.success) return redirect("/");

  const users = await auth.api.listUsers({
    headers: await headers(),
    query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
  });

  return (
    <div className="mx-auto container py-6 px-4 lg:px-6">
      <UsersTable users={users.users} selfId={session.user.id} />
    </div>
  );
}
