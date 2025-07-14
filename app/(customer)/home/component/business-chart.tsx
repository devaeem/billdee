"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

interface ChartData {
  date: string;
  revenue: number;
  cogs: number;
  expenses: number;
}

interface BusinessChartProps {
  data: ChartData[];
  period?: string;
}

const BusinessChart: React.FC<BusinessChartProps> = ({
  data,
  period = "เดือนนี้",
}) => {
  const formatCurrency = (value: number) => {
    return `฿${value.toLocaleString()}`;
  };

  const formatTooltip = (value: number, name: string) => {
    const labels: { [key: string]: string } = {
      revenue: "รายได้",
      cogs: "ต้นทุนขาย",
      expenses: "ค่าใช้จ่ายอื่น",
    };
    return [formatCurrency(value), labels[name] || name];
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          กราฟสรุปธุรกิจ ({period})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                formatter={formatTooltip}
                labelStyle={{ color: "#333" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                iconType="rect"
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => {
                  const labels: { [key: string]: string } = {
                    revenue: "รายได้",
                    cogs: "ต้นทุนขาย",
                    expenses: "ค่าใช้จ่ายอื่น",
                  };
                  return labels[value] || value;
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#10b981"
                name="revenue"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="cogs"
                fill="#f59e0b"
                name="cogs"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                fill="#ef4444"
                name="expenses"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessChart;
