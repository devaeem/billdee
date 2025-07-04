"use client";
import React from "react";
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

  return (
    <>
      {shopehas ? (
        <div className="p-2    flex flex-col gap-3">
          {/* <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold   ">แดชบอร์ด</h1>
      </div> */}

          {/* Filters */}
          <SalesFilter onFilterChange={(filters) => console.log(filters)} />

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white hover:shadow-lg transition-shadow">
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
            <Card className="bg-white hover:shadow-lg transition-shadow">
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
            <Card className="bg-white hover:shadow-lg transition-shadow">
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
          <div className="grid grid-cols-7 gap-4">
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
