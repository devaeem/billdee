"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  FileText,
  Printer,
  Download,
  Clock,
  Calendar,
  DollarSign,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/custom-ui/pagination";
import Btn from "@/components/custom-ui/btn";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Edit01Icon,
  GridTableIcon,
  LayoutTable01Icon,
} from "@hugeicons/core-free-icons";
import { ColumnDef } from "@tanstack/react-table";

// Mock data - replace with real data later
interface Bills {
  id: string;
  customerName: string;
  date: string;
  time: string;
  total: number;
  status: string;
}
const bills = [
  {
    id: "BILL-001",
    customerName: "ร้านค้า A",
    date: "2024-03-20",
    time: "14:30",
    total: 2500.0,
    status: "ชำระแล้ว",
    items: 5,
  },
  {
    id: "BILL-002",
    customerName: "ร้านค้า B",
    date: "2024-03-20",
    time: "15:45",
    total: 1800.0,
    status: "รอชำระ",
    items: 3,
  },
  // Add more mock data as needed
];

const BillMain = () => {
  const columns: ColumnDef<Bills>[] = [
    {
      header: "รหัส",
      accessorKey: "id",
    },
    {
      header: "ชื่อลูกค้า",
      accessorKey: "customerName",
    },
    {
      header: "วันที่",
      accessorKey: "date",
    },
    {
      header: "เวลา",
      accessorKey: "time",
    },
    {
      header: "จำนวนเงิน",
      accessorKey: "total",
    },
    {
      header: "สถานะ",
      accessorKey: "status",
    },
    {
      header: "จำนวนรายการ",
      accessorKey: "items",
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => {
        return (
          <div className="flex items-center gap-2">
            <Btn variant="ghost" size="icon">
              <HugeiconsIcon icon={Edit01Icon} size={20} />
            </Btn>
            <Btn variant="ghost" size="icon">
              <HugeiconsIcon icon={Delete02Icon} size={20} />
            </Btn>
          </div>
        );
      },
    },
  ];
  const data = bills;
  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">รายการบิล</h1>
          <p className="text-muted-foreground">
            จัดการและดูรายการบิลทั้งหมดของคุณ
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/customer/bill/create">
            <Plus className="h-4 w-4" />
            สร้างบิลใหม่
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="card" className="w-full">
        <TabsList>
          <TabsTrigger value="card" className="gap-2">
            <HugeiconsIcon icon={GridTableIcon} size={20} />
          </TabsTrigger>
          <TabsTrigger value="table" className="gap-2">
            <HugeiconsIcon icon={LayoutTable01Icon} size={20} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bills.map((bill) => (
              <Card key={bill.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-semibold">{bill.customerName}</h2>
                    <p className="text-sm text-muted-foreground">{bill.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        bill.status === "ชำระแล้ว" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {bill.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          ดูรายละเอียด
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          พิมพ์บิล
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          ดาวน์โหลด PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{bill.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{bill.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      ฿{bill.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">จำนวนรายการ</span>
                    <span className="font-medium">{bill.items} รายการ</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="flex flex-col gap-4">
          <DataTable columns={columns} data={data} />
          <Pagination
            totalItems={data.length}
            itemsPerPage={10}
            currentPage={1}
            onPageChange={() => {}}
            onItemsPerPageChange={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillMain;
