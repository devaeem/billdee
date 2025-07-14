"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface MonthlyTargetProps {
  data?: {
    pending: number;
    done: number;
    new: number;
  };
}

const MonthlyTarget: React.FC<MonthlyTargetProps> = ({ data }) => {
  const defaultData = data || {
    pending: 32,
    done: 46,
    new: 25,
  };

  const chartData = [
    { name: "Pending Projects", value: defaultData.pending, color: "#ff6b6b" },
    { name: "Done Projects", value: defaultData.done, color: "#9c4dcc" },
    { name: "New Projects", value: defaultData.new, color: "#26c6da" },
  ];

  const total = defaultData.pending + defaultData.done + defaultData.new;

  return (
    <Card className="h-full  shadow-lg border-0 rounded-4xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Monthly Target
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-64">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {defaultData.pending}
              </div>
              <div className="text-xs text-gray-500">Projects Pending</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 space-y-2 w-full">
          {[
            {
              label: "Pending Projects",
              value: defaultData.pending,
              percent: "44.75%",
              color: "#ff6b6b",
            },
            {
              label: "Done Projects",
              value: defaultData.done,
              percent: "46.27%",
              color: "#9c4dcc",
            },
            {
              label: "New Projects",
              value: defaultData.new,
              percent: "25%",
              color: "#26c6da",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.label}</span>
              </div>
              <span className="text-gray-800 font-medium">{item.percent}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTarget;
