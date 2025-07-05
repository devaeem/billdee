"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "ร้านค้า A", value: 150000 },
  { name: "ร้านค้า B", value: 98000 },
  { name: "ร้านค้า C", value: 220000 },
];

// สีที่สวยงามและดูทันสมัย
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"];

const SalesDistribution = () => {
  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold">
          สัดส่วนยอดขายตามร้านค้า
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}\n${((percent || 0) * 100).toFixed(1)}%`
                }
                labelLine={true}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `฿${value.toLocaleString()}`,
                  "ยอดขาย",
                ]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  fontSize: "13px",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "13px",
                  paddingTop: "20px",
                }}
                iconType="circle"
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesDistribution;
