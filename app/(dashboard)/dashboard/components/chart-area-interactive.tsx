"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart showing revenue";

const chartData = [
  { date: "2024-04-01", online: 22200, offline: 15000 },
  { date: "2024-04-02", online: 19700, offline: 18000 },
  { date: "2024-04-03", online: 16700, offline: 12000 },
  { date: "2024-04-04", online: 24200, offline: 26000 },
  { date: "2024-04-05", online: 37300, offline: 29000 },
  { date: "2024-04-06", online: 30100, offline: 34000 },
  { date: "2024-04-07", online: 24500, offline: 18000 },
  { date: "2024-04-08", online: 40900, offline: 32000 },
  { date: "2024-04-09", online: 15900, offline: 11000 },
  { date: "2024-04-10", online: 26100, offline: 19000 },
  { date: "2024-04-11", online: 32700, offline: 35000 },
  { date: "2024-04-12", online: 29200, offline: 21000 },
  { date: "2024-04-13", online: 34200, offline: 38000 },
  { date: "2024-04-14", online: 13700, offline: 22000 },
  { date: "2024-04-15", online: 12000, offline: 17000 },
  { date: "2024-04-16", online: 13800, offline: 19000 },
  { date: "2024-04-17", online: 44600, offline: 36000 },
  { date: "2024-04-18", online: 36400, offline: 41000 },
  { date: "2024-04-19", online: 24300, offline: 18000 },
  { date: "2024-04-20", online: 8900, offline: 15000 },
  { date: "2024-04-21", online: 13700, offline: 20000 },
  { date: "2024-04-22", online: 22400, offline: 17000 },
  { date: "2024-04-23", online: 13800, offline: 23000 },
  { date: "2024-04-24", online: 38700, offline: 29000 },
  { date: "2024-04-25", online: 21500, offline: 25000 },
  { date: "2024-04-26", online: 7500, offline: 13000 },
  { date: "2024-04-27", online: 38300, offline: 42000 },
  { date: "2024-04-28", online: 12200, offline: 18000 },
  { date: "2024-04-29", online: 31500, offline: 24000 },
  { date: "2024-04-30", online: 45400, offline: 38000 },
  { date: "2024-05-01", online: 16500, offline: 22000 },
  { date: "2024-05-02", online: 29300, offline: 31000 },
  { date: "2024-05-03", online: 24700, offline: 19000 },
  { date: "2024-05-04", online: 38500, offline: 42000 },
  { date: "2024-05-05", online: 48100, offline: 39000 },
  { date: "2024-05-06", online: 49800, offline: 52000 },
  { date: "2024-05-07", online: 38800, offline: 30000 },
  { date: "2024-05-08", online: 14900, offline: 21000 },
  { date: "2024-05-09", online: 22700, offline: 18000 },
  { date: "2024-05-10", online: 29300, offline: 33000 },
  { date: "2024-05-11", online: 33500, offline: 27000 },
  { date: "2024-05-12", online: 19700, offline: 24000 },
  { date: "2024-05-13", online: 19700, offline: 16000 },
  { date: "2024-05-14", online: 44800, offline: 49000 },
  { date: "2024-05-15", online: 47300, offline: 38000 },
  { date: "2024-05-16", online: 33800, offline: 40000 },
  { date: "2024-05-17", online: 49900, offline: 42000 },
  { date: "2024-05-18", online: 31500, offline: 35000 },
  { date: "2024-05-19", online: 23500, offline: 18000 },
  { date: "2024-05-20", online: 17700, offline: 23000 },
  { date: "2024-05-21", online: 8200, offline: 14000 },
  { date: "2024-05-22", online: 8100, offline: 12000 },
  { date: "2024-05-23", online: 25200, offline: 29000 },
  { date: "2024-05-24", online: 29400, offline: 22000 },
  { date: "2024-05-25", online: 20100, offline: 25000 },
  { date: "2024-05-26", online: 21300, offline: 17000 },
  { date: "2024-05-27", online: 42000, offline: 46000 },
  { date: "2024-05-28", online: 23300, offline: 19000 },
  { date: "2024-05-29", online: 7800, offline: 13000 },
  { date: "2024-05-30", online: 34000, offline: 28000 },
  { date: "2024-05-31", online: 17800, offline: 23000 },
  { date: "2024-06-01", online: 17800, offline: 20000 },
  { date: "2024-06-02", online: 47000, offline: 41000 },
  { date: "2024-06-03", online: 10300, offline: 16000 },
  { date: "2024-06-04", online: 43900, offline: 38000 },
  { date: "2024-06-05", online: 8800, offline: 14000 },
  { date: "2024-06-06", online: 29400, offline: 25000 },
  { date: "2024-06-07", online: 32300, offline: 37000 },
  { date: "2024-06-08", online: 38500, offline: 32000 },
  { date: "2024-06-09", online: 43800, offline: 48000 },
  { date: "2024-06-10", online: 15500, offline: 20000 },
  { date: "2024-06-11", online: 9200, offline: 15000 },
  { date: "2024-06-12", online: 49200, offline: 42000 },
  { date: "2024-06-13", online: 8100, offline: 13000 },
  { date: "2024-06-14", online: 42600, offline: 38000 },
  { date: "2024-06-15", online: 30700, offline: 35000 },
  { date: "2024-06-16", online: 37100, offline: 31000 },
  { date: "2024-06-17", online: 47500, offline: 52000 },
  { date: "2024-06-18", online: 10700, offline: 17000 },
  { date: "2024-06-19", online: 34100, offline: 29000 },
  { date: "2024-06-20", online: 40800, offline: 45000 },
  { date: "2024-06-21", online: 16900, offline: 21000 },
  { date: "2024-06-22", online: 31700, offline: 27000 },
  { date: "2024-06-23", online: 48000, offline: 53000 },
  { date: "2024-06-24", online: 13200, offline: 18000 },
  { date: "2024-06-25", online: 14100, offline: 19000 },
  { date: "2024-06-26", online: 43400, offline: 38000 },
  { date: "2024-06-27", online: 44800, offline: 49000 },
  { date: "2024-06-28", online: 14900, offline: 20000 },
  { date: "2024-06-29", online: 10300, offline: 16000 },
  { date: "2024-06-30", online: 44600, offline: 40000 },
];

const chartConfig = {
  revenue: {
    label: "รายได้รวม",
  },
  online: {
    label: "ออนไลน์",
    color: "var(--primary)",
  },
  offline: {
    label: "หน้าร้าน",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>รายได้รวม</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            รายได้ทั้งหมดในช่วง 3 เดือนที่ผ่านมา
          </span>
          <span className="@[540px]/card:hidden">3 เดือนที่ผ่านมา</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 เดือนที่ผ่านมา</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 วันที่ผ่านมา</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 วันที่ผ่านมา</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="เลือกช่วงเวลา"
            >
              <SelectValue placeholder="3 เดือนที่ผ่านมา" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 เดือนที่ผ่านมา
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 วันที่ผ่านมา
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 วันที่ผ่านมา
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={filteredData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="online" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="offline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <Area
              type="monotone"
              dataKey="online"
              stroke={chartConfig.online.color}
              fillOpacity={1}
              fill="url(#online)"
            />
            <Area
              type="monotone"
              dataKey="offline"
              stroke={chartConfig.offline.color}
              fillOpacity={1}
              fill="url(#offline)"
            />
            <ChartTooltip
              content={({
                active,
                payload,
              }: {
                active: boolean;
                payload?: Array<{
                  value: number;
                  payload: {
                    date: string;
                  };
                }>;
              }) => {
                if (!active || !payload) return null;
                const date = new Date(payload[0].payload.date);
                const formattedDate = new Intl.DateTimeFormat("th-TH", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(date);
                return (
                  <ChartTooltipContent>
                    <p>{formattedDate}</p>
                    <ul>
                      <li>
                        <span>ออนไลน์:</span>{" "}
                        <span>฿{payload[0].value?.toLocaleString()}</span>
                      </li>
                      <li>
                        <span>หน้าร้าน:</span>{" "}
                        <span>฿{payload[1].value?.toLocaleString()}</span>
                      </li>
                    </ul>
                  </ChartTooltipContent>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
