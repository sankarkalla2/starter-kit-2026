import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/modules/admin/components/admin-sidebar";
import React from "react";

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
