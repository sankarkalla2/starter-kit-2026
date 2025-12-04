import { AppSidebar } from "@/components/dashboard-sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar collapsible="icon" />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardSidebar;
