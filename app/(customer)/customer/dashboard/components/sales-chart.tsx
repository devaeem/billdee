"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Jan", totalSales: 4000, storeSales: 2400, onlineSales: 1600 },
  { name: "Feb", totalSales: 3000, storeSales: 1398, onlineSales: 1602 },
  { name: "Mar", totalSales: 2000, storeSales: 1200, onlineSales: 800 },
  { name: "Apr", totalSales: 2780, storeSales: 1908, onlineSales: 872 },
  { name: "May", totalSales: 1890, storeSales: 1800, onlineSales: 90 },
  { name: "Jun", totalSales: 2390, storeSales: 1400, onlineSales: 990 },
];

const SalesChart = () => {
  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">ยอดขายรายเดือน</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="storeSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="onlineSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={60}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
                tickFormatter={(value) => `฿${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value) => `฿${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  padding: "8px 12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "16px",
                }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#totalSales)"
                name="ยอดขายรวม"
              />
              <Area
                type="monotone"
                dataKey="storeSales"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#storeSales)"
                name="ยอดขายหน้าร้าน"
              />
              <Area
                type="monotone"
                dataKey="onlineSales"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#onlineSales)"
                name="ยอดขายออนไลน์"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
