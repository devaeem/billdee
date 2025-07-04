"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const storeData = [
  {
    id: 1,
    name: "ร้านค้า A",
    totalSales: 150000,
    orders: 45,
    performance: "ดี",
  },
  {
    id: 2,
    name: "ร้านค้า B",
    totalSales: 98000,
    orders: 32,
    performance: "ปานกลาง",
  },
  {
    id: 3,
    name: "ร้านค้า C",
    totalSales: 220000,
    orders: 67,
    performance: "ดีมาก",
  },
];

const StorePerformance = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>ผลการดำเนินงานร้านค้า</CardTitle>
        <CardDescription>รายงานผลการดำเนินงานของร้านค้าทั้งหมด</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อร้านค้า</TableHead>
              <TableHead>ยอดขายรวม</TableHead>
              <TableHead>จำนวนออเดอร์</TableHead>
              <TableHead>ผลงาน</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeData.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>฿{store.totalSales.toLocaleString()}</TableCell>
                <TableCell>{store.orders}</TableCell>
                <TableCell>{store.performance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StorePerformance;
