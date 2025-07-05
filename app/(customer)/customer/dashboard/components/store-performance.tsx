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
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          ผลการดำเนินงานร้านค้า
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          รายงานผลการดำเนินงานของร้านค้าทั้งหมด
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">ชื่อร้านค้า</TableHead>
                <TableHead className="w-[200px]">ยอดขายรวม</TableHead>
                <TableHead className="w-[150px]">จำนวนออเดอร์</TableHead>
                <TableHead className="w-[150px]">ผลงาน</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeData.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>฿{store.totalSales.toLocaleString()}</TableCell>
                  <TableCell>{store.orders}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        store.performance === "ดีมาก"
                          ? "bg-green-100 text-green-800"
                          : store.performance === "ดี"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {store.performance}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorePerformance;
