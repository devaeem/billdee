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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import Btn from "@/components/custom-ui/btn";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Edit01Icon,
  GridTableIcon,
  LayoutTable01Icon,
  PlusSignCircleIcon,
} from "@hugeicons/core-free-icons";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Pagination from "@/components/custom-ui/pagination";

interface Expense {
  id: string;
  description: string;
  category: string;
  date: string;
  time: string;
  amount: number;
  status: string;
}

// Mock data - replace with real data later
const expenses = [
  {
    id: "EXP-001",
    description: "ค่าวัตถุดิบ",
    category: "วัตถุดิบ",
    date: "2024-03-20",
    time: "14:30",
    amount: 2500.0,
    status: "จ่ายแล้ว",
  },
  {
    id: "EXP-002",
    description: "ค่าขนส่ง",
    category: "ขนส่ง",
    date: "2024-03-20",
    time: "15:45",
    amount: 1800.0,
    status: "ค้างจ่าย",
  },
  // Add more mock data as needed
];

const RecordExpensesMain = () => {
  const columns: ColumnDef<Expense>[] = [
    {
      header: "รหัส",
      accessorKey: "id",
    },
    {
      header: "รายละเอียด",
      accessorKey: "description",
    },
    {
      header: "หมวดหมู่",
      accessorKey: "category",
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
      accessorKey: "amount",
    },
    {
      header: "สถานะ",
      accessorKey: "status",
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
  const data = expenses;
  return (
    <div className="flex  flex-col gap-6 bg-white p-4 rounded-lg">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">บันทึกค่าใช้จ่าย</h1>
          <p className="text-muted-foreground">
            จัดการและดูรายการค่าใช้จ่ายทั้งหมดของคุณ
          </p>
        </div>
        <Link
          href="/customer/record-expenses/create"
          className="w-full md:w-auto"
        >
          <Btn
            variant="outline"
            startIcon={
              <HugeiconsIcon
                icon={PlusSignCircleIcon}
                size={20}
                color="currentColor"
              />
            }
          >
            บันทึกค่าใช้จ่ายใหม่
          </Btn>
        </Link>
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
            {expenses.map((expense) => (
              <Card key={expense.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-semibold">{expense.description}</h2>
                    <p className="text-sm text-muted-foreground">
                      {expense.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        expense.status === "จ่ายแล้ว" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {expense.status}
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
                          พิมพ์รายการ
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
                    <span>{expense.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{expense.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      ฿{expense.amount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">หมวดหมู่</span>
                    <span className="font-medium">{expense.category}</span>
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

export default RecordExpensesMain;
