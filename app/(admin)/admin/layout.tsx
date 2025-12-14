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
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
