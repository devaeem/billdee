"use client";
import React, { useEffect, useState } from "react";
import SalesChart from "./components/sales-chart";
import StorePerformance from "./components/store-performance";
import SalesDistribution from "./components/sales-distribution";
import SalesFilter from "./components/sales-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShopEmty from "./components/shop-emty";

const DashboardPage = () => {
  const stats = {
    totalSales: 468000,
    totalOrders: 144,
    activeStores: 3,
  };

  const shopehas = true;
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("สวัสดีตอนเช้า");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("สวัสดีตอนบ่าย");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("สวัสดีตอนเย็น");
    } else {
      setGreeting("สวัสดีตอนกลางคืน");
    }
  }, []);

  return (
    <>
      {shopehas ? (
        <div className="p-6 flex flex-col gap-6">
          {/* Greeting Section */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {greeting}! 👋
            </h1>
            <p className="text-gray-600">
              ยินดีต้อนรับกลับมา มาดูผลการดำเนินงานของร้านค้าของคุณกัน
            </p>
          </div>

          {/* Filters */}
          <SalesFilter />

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  ยอดขายทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  ฿{stats.totalSales.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  +12% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  จำนวนออเดอร์
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalOrders}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  +5% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  ร้านค้าที่ใช้งาน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.activeStores}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  เท่ากับเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <SalesChart />
            <SalesDistribution />
          </div>

          {/* Store Performance Table */}
          <StorePerformance />
        </div>
      ) : (
        <ShopEmty />
      )}
    </>
  );
};

export default DashboardPage;
