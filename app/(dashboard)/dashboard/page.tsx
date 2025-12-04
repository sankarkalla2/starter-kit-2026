import { ChartAreaInteractive } from "@/components/dashboard-sidebar/chat-area-interactive";
import { DataTable } from "@/components/dashboard-sidebar/data-table";
import { SectionCards } from "@/components/dashboard-sidebar/section-cards";
import { SiteHeader } from "@/components/dashboard-sidebar/site-header";
import data from "@/components/dashboard-sidebar/data.json";
const Dashboard = () => {
  return (
    <div className="w-full">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
