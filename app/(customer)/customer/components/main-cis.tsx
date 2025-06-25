"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
}

const dummyInvoices: Invoice[] = [
  {
    id: "INV-2024001",
    date: "2024-03-01",
    amount: 3500,
    status: "pending",
    dueDate: "2024-03-15",
  },
  {
    id: "INV-2024002",
    date: "2024-02-01",
    amount: 4200,
    status: "paid",
    dueDate: "2024-02-15",
  },
  {
    id: "INV-2024003",
    date: "2024-01-01",
    amount: 3800,
    status: "overdue",
    dueDate: "2024-01-15",
  },
];

const dummyPayments: Payment[] = [
  {
    id: "PAY-2024001",
    date: "2024-02-15",
    amount: 4200,
    method: "โอนเงิน",
    status: "success",
  },
  {
    id: "PAY-2024002",
    date: "2024-01-20",
    amount: 3800,
    method: "บัตรเครดิต",
    status: "success",
  },
];

export function InvoiceTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>เลขที่</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead>ยอดเงิน</TableHead>
          <TableHead>กำหนดชำระ</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>การดำเนินการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyInvoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>฿{invoice.amount.toLocaleString()}</TableCell>
            <TableCell>{invoice.dueDate}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === "paid"
                    ? "secondary"
                    : invoice.status === "pending"
                    ? "default"
                    : "destructive"
                }
              >
                {invoice.status === "paid"
                  ? "ชำระแล้ว"
                  : invoice.status === "pending"
                  ? "รอชำระ"
                  : "เกินกำหนด"}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                ดูรายละเอียด
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaymentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>เลขที่</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead>ยอดเงิน</TableHead>
          <TableHead>วิธีการชำระ</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>การดำเนินการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyPayments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.id}</TableCell>
            <TableCell>{payment.date}</TableCell>
            <TableCell>฿{payment.amount.toLocaleString()}</TableCell>
            <TableCell>{payment.method}</TableCell>
            <TableCell>
              <Badge
                variant={
                  payment.status === "success"
                    ? "secondary"
                    : payment.status === "pending"
                    ? "default"
                    : "destructive"
                }
              >
                {payment.status === "success"
                  ? "สำเร็จ"
                  : payment.status === "pending"
                  ? "กำลังดำเนินการ"
                  : "ไม่สำเร็จ"}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                ดูรายละเอียด
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const MainCis = () => {
  return <div>MainCis</div>;
};

export default MainCis;
