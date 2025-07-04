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
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>ยอดขายรายเดือน</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="storeSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="onlineSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => `฿${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#totalSales)"
                name="ยอดขายรวม"
              />
              <Area
                type="monotone"
                dataKey="storeSales"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#storeSales)"
                name="ยอดขายหน้าร้าน"
              />
              <Area
                type="monotone"
                dataKey="onlineSales"
                stroke="#ffc658"
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
