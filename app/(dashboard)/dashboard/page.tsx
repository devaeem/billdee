import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { SectionCards } from "./components/section-cards";
import { DataTable } from "./components/data-table";

const tableData = [
  {
    id: 1,
    header: "ยอดขายวันนี้",
    type: "รายวัน",
    status: "Done",
    target: "฿15,000",
    limit: "฿20,000",
    reviewer: "ระบบ",
  },
  {
    id: 2,
    header: "ยอดขายสัปดาห์นี้",
    type: "รายสัปดาห์",
    status: "Done",
    target: "฿85,000",
    limit: "฿100,000",
    reviewer: "ระบบ",
  },
  {
    id: 3,
    header: "ยอดขายเดือนนี้",
    type: "รายเดือน",
    status: "In Progress",
    target: "฿320,000",
    limit: "฿500,000",
    reviewer: "ระบบ",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-4 pt-6 lg:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">รายงานภาพรวม</h2>
        </div>

        {/* Summary Cards */}
        <SectionCards />

        {/* Revenue Chart */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium">รายได้ประจำเดือน</h3>
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium">สรุปยอดขาย</h3>
              <DataTable data={tableData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
