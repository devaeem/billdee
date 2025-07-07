"use client";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, subDays, subMonths } from "date-fns";
import { th } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data - replace with real data from your API
const generateMockData = (days: number = 30) => {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date,
      sales: Math.floor(Math.random() * 100000) + 20000,
      profit: Math.floor(Math.random() * 50000) + 10000,
    });
  }
  return data;
};

const generateMonthlyData = (months: number = 12) => {
  const data = [];
  for (let i = months - 1; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    data.push({
      date,
      sales: Math.floor(Math.random() * 1000000) + 200000,
      profit: Math.floor(Math.random() * 500000) + 100000,
    });
  }
  return data;
};

const yearOptions = [2024, 2023, 2022].map((year) => ({
  value: year.toString(),
  label: `ปี ${year + 543}`,
}));

const timeRanges = [
  { value: "7", label: "7 วัน" },
  { value: "30", label: "30 วัน" },
  { value: "90", label: "90 วัน" },
];

// Custom colors and gradients
const chartColors = {
  sales: {
    main: "var(--primary)",
    gradient: ["rgba(var(--primary-rgb), 0.2)", "rgba(var(--primary-rgb), 0)"],
  },
  profit: {
    main: "#10b981",
    gradient: ["rgba(16, 185, 129, 0.2)", "rgba(16, 185, 129, 0)"],
  },
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: {
    dataKey: string;
    value: number;
  }[];
  label: string;
}) => {
  if (!active || !payload?.length) return null;

  const data = payload[0];
  const isProfit = data.dataKey === "profit";
  const color = isProfit ? chartColors.profit.main : chartColors.sales.main;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <p className="mb-1 text-sm text-muted-foreground">
        {format(new Date(label), "PPP", { locale: th })}
      </p>
      <p className="flex items-center gap-2 font-medium" style={{ color }}>
        <span>{isProfit ? "กำไร" : "ยอดขาย"}:</span>
        <span>฿{data.value.toLocaleString()}</span>
      </p>
    </div>
  );
};

const ReportSales = () => {
  const isMobile = useIsMobile();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedView, setSelectedView] = useState<"sales" | "profit">("sales");
  const [selectedRange, setSelectedRange] = useState("7");
  const [viewType, setViewType] = useState<"daily" | "monthly">("daily");

  const data = useMemo(() => {
    if (viewType === "daily") {
      return generateMockData(parseInt(selectedRange));
    }
    return generateMonthlyData();
  }, [selectedRange, viewType]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:items-center sm:flex-row sm:justify-between">
          <div>
            <CardTitle>รายงานยอดขาย</CardTitle>
            <CardDescription>
              แสดงข้อมูลยอดขายและกำไรตามช่วงเวลา
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Tabs
              value={viewType}
              onValueChange={(v) => setViewType(v as "daily" | "monthly")}
              className="mr-0 sm:mr-2"
            >
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="daily">รายวัน</TabsTrigger>
                <TabsTrigger value="monthly">รายเดือน</TabsTrigger>
              </TabsList>
            </Tabs>
            {viewType === "daily" ? (
              <Select value={selectedRange} onValueChange={setSelectedRange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="flex gap-1">
              <Button
                variant={selectedView === "sales" ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setSelectedView("sales")}
                className={
                  selectedView === "sales"
                    ? "bg-primary hover:bg-primary/90"
                    : ""
                }
              >
                ยอดขาย
              </Button>
              <Button
                variant={selectedView === "profit" ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setSelectedView("profit")}
                className={
                  selectedView === "profit"
                    ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500"
                    : ""
                }
              >
                กำไร
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={
                isMobile
                  ? { top: 20, right: 10, left: -20, bottom: 5 }
                  : { top: 20, right: 30, left: 20, bottom: 5 }
              }
              className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-border [&_.recharts-cartesian-grid-vertical_line]:stroke-border [&_.recharts-cartesian-axis-line]:stroke-border"
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  {chartColors.sales.gradient.map((color, index) => (
                    <stop
                      key={index}
                      offset={`${index * 100}%`}
                      stopColor={color}
                    />
                  ))}
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  {chartColors.profit.gradient.map((color, index) => (
                    <stop
                      key={index}
                      offset={`${index * 100}%`}
                      stopColor={color}
                    />
                  ))}
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-muted"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return viewType === "daily"
                    ? format(date, isMobile ? "d/M" : "d MMM", { locale: th })
                    : format(date, isMobile ? "M/yy" : "MMM yyyy", {
                        locale: th,
                      });
                }}
                angle={isMobile ? -30 : -45}
                textAnchor="end"
                height={60}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: isMobile ? 11 : 12,
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={{ stroke: "var(--border)" }}
                interval={isMobile ? 2 : 1}
              />
              <YAxis
                tickFormatter={(value) =>
                  `฿${
                    value >= 1000000
                      ? (value / 1000000).toFixed(1) + "M"
                      : (value / 1000).toFixed(0) + "K"
                  }`
                }
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: isMobile ? 11 : 12,
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={{ stroke: "var(--border)" }}
                width={isMobile ? 45 : 60}
              />
              <Tooltip
                content={
                  <CustomTooltip active={false} payload={[]} label={""} />
                }
              />
              <Bar
                dataKey={selectedView}
                fill={`url(#${selectedView}Gradient)`}
                stroke={
                  selectedView === "sales"
                    ? chartColors.sales.main
                    : chartColors.profit.main
                }
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSales;
