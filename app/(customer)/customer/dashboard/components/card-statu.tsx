"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  Package,
  Receipt,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const CardStatus = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue Card */}
      <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                <Wallet className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-[15px] font-medium text-white">รายได้รวม</p>
            </div>
            <span className="flex items-center gap-0.5 rounded-full bg-emerald-400/20 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4" />
              0%
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              ฿0.00
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">จำนวนบิล</p>
              <p className="text-sm font-medium text-white">0 รายการ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COGS Card */}
      <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                <Package className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-[15px] font-medium text-white">ต้นทุนขาย</p>
            </div>
            <span className="flex items-center gap-0.5 rounded-full bg-red-400/20 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <ArrowDownRight className="h-4 w-4" />
              0%
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              ฿0.00
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">จำนวนบิลขาย</p>
              <p className="text-sm font-medium text-white">0 รายการ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Expenses Card */}
      <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-md transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                <Receipt className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-[15px] font-medium text-white">ค่าใช้จ่าย</p>
            </div>
            <span className="flex items-center gap-0.5 rounded-full bg-emerald-400/20 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4" />
              0%
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              ฿0.00
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">จำนวนรายการ</p>
              <p className="text-sm font-medium text-white">0 รายการ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Profit Card */}
      <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-orange-500 to-pink-600 shadow-md transition-all duration-300 hover:shadow-lg">
        <CardContent className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-[15px] font-medium text-white">กำไรสุทธิ</p>
            </div>
            <span className="flex items-center gap-0.5 rounded-full bg-emerald-400/20 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4" />
              0%
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              ฿0.00
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/80">รายได้ - ต้นทุน</p>
              <p className="text-sm font-medium text-white">0%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardStatus;
