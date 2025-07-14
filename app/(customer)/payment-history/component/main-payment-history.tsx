"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/custom-ui/pagination";
import Input from "@/components/custom-ui/input";
import Select from "@/components/custom-ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  CreditCard,
  Banknote,
  Smartphone,
  Calendar,
  FileText,
  MoreHorizontal,
  Eye,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaymentHistory {
  id: string;
  transactionId: string;
  date: string;
  time: string;
  amount: number;
  paymentMethod: "credit_card" | "bank_transfer" | "digital_wallet" | "cash";
  status: "completed" | "pending" | "failed" | "refunded";
  description: string;
  receiptNumber?: string;
  invoiceNumber?: string;
}

const MainPaymentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock data for payment history
  const paymentData: PaymentHistory[] = [
    {
      id: "1",
      transactionId: "TXN-2024-001",
      date: "2024-01-15",
      time: "14:30",
      amount: 4500.0,
      paymentMethod: "credit_card",
      status: "completed",
      description: "ชำระค่าบริการแพ็กเกจ MOMO",
      receiptNumber: "RCP-001",
      invoiceNumber: "INV-001",
    },
    {
      id: "2",
      transactionId: "TXN-2024-002",
      date: "2024-01-10",
      time: "09:15",
      amount: 2250.0,
      paymentMethod: "bank_transfer",
      status: "completed",
      description: "ชำระค่าบริการแพ็กเกจ FLOOR",
      receiptNumber: "RCP-002",
      invoiceNumber: "INV-002",
    },
    {
      id: "3",
      transactionId: "TXN-2024-003",
      date: "2024-01-08",
      time: "16:45",
      amount: 1500.0,
      paymentMethod: "digital_wallet",
      status: "pending",
      description: "ชำระค่าบริการเพิ่มเติม",
      receiptNumber: "RCP-003",
    },
    {
      id: "4",
      transactionId: "TXN-2024-004",
      date: "2024-01-05",
      time: "11:20",
      amount: 750.0,
      paymentMethod: "credit_card",
      status: "failed",
      description: "ชำระค่าบริการ upgrade",
      receiptNumber: "RCP-004",
    },
    {
      id: "5",
      transactionId: "TXN-2024-005",
      date: "2024-01-03",
      time: "13:00",
      amount: 1200.0,
      paymentMethod: "bank_transfer",
      status: "refunded",
      description: "คืนเงินค่าบริการ",
      receiptNumber: "RCP-005",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "สำเร็จ", className: "bg-green-100 text-green-800" },
      pending: {
        label: "รอดำเนินการ",
        className: "bg-yellow-100 text-yellow-800",
      },
      failed: { label: "ล้มเหลว", className: "bg-red-100 text-red-800" },
      refunded: { label: "คืนเงิน", className: "bg-blue-100 text-blue-800" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={cn("font-medium", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    const methodConfig = {
      credit_card: { icon: CreditCard, label: "บัตรเครดิต" },
      bank_transfer: { icon: Banknote, label: "โอนเงิน" },
      digital_wallet: { icon: Smartphone, label: "กระเป๋าเงินดิจิทัล" },
      cash: { icon: Banknote, label: "เงินสด" },
    };
    const config = methodConfig[method as keyof typeof methodConfig];
    const IconComponent = config.icon;
    return (
      <div className="flex items-center gap-2">
        <IconComponent className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{config.label}</span>
      </div>
    );
  };

  const columns: ColumnDef<PaymentHistory>[] = [
    {
      header: "วันที่/เวลา",
      accessorKey: "date",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {new Date(row.original.date).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-xs text-gray-500">{row.original.time}</span>
        </div>
      ),
    },
    {
      header: "รหัสธุรกรรม",
      accessorKey: "transactionId",
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.original.transactionId}</div>
      ),
    },
    {
      header: "จำนวนเงิน",
      accessorKey: "amount",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          ฿
          {row.original.amount.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      header: "วิธีชำระ",
      accessorKey: "paymentMethod",
      cell: ({ row }) => getPaymentMethodIcon(row.original.paymentMethod),
    },
    {
      header: "สถานะ",
      accessorKey: "status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      header: "รายละเอียด",
      accessorKey: "description",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate text-sm">
          {row.original.description}
        </div>
      ),
    },
  ];

  const statusOptions = [
    { value: "all", label: "ทุกสถานะ" },
    { value: "completed", label: "สำเร็จ" },
    { value: "pending", label: "รอดำเนินการ" },
    { value: "failed", label: "ล้มเหลว" },
    { value: "refunded", label: "คืนเงิน" },
  ];

  const methodOptions = [
    { value: "all", label: "ทุกวิธี" },
    { value: "credit_card", label: "บัตรเครดิต" },
    { value: "bank_transfer", label: "โอนเงิน" },
    { value: "digital_wallet", label: "กระเป๋าเงินดิจิทัล" },
    { value: "cash", label: "เงินสด" },
  ];

  // Filter data based on search and filter criteria
  const filteredData = paymentData.filter((payment) => {
    const matchesSearch =
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.paymentMethod === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Calculate summary statistics
  const totalPayments = filteredData.length;
  const totalAmount = filteredData
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = filteredData.filter(
    (p) => p.status === "pending"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          ประวัติการชำระเงิน
        </h1>
        <p className="text-gray-600">
          จัดการและตรวจสอบประวัติการชำระเงินทั้งหมดของคุณ
        </p>
      </div>

      <Separator />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  ธุรกรรมทั้งหมด
                </p>
                <p className="text-2xl font-bold">{totalPayments}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  ยอดชำระสำเร็จ
                </p>
                <p className="text-2xl font-bold">
                  ฿{totalAmount.toLocaleString("th-TH")}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">รอดำเนินการ</p>
                <p className="text-2xl font-bold">{pendingPayments}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            ตัวกรองข้อมูล
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="ค้นหาธุรกรรม..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="h-4 w-4" />}
            />
            <Select
              placeholder="เลือกสถานะ"
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={statusOptions}
            />
            <Select
              placeholder="เลือกวิธีชำระ"
              value={methodFilter}
              onValueChange={setMethodFilter}
              options={methodOptions}
            />
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              เลือกช่วงวันที่
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการชำระเงิน</CardTitle>
          <CardDescription>
            ประวัติการชำระเงินทั้งหมด เรียงตามวันที่ล่าสุด
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <DataTable columns={columns} data={filteredData} />
            <Pagination
              totalItems={totalPayments}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainPaymentHistory;
