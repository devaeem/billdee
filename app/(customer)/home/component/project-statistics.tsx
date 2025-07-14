"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ProjectStatisticsProps {
  data?: Array<{
    month: string;
    workingHours: number;
    projects: number;
  }>;
}

const ProjectStatistics: React.FC<ProjectStatisticsProps> = ({ data }) => {
  const defaultData = data || [
    { month: "Jan", workingHours: 300, projects: 250 },
    { month: "Feb", workingHours: 350, projects: 280 },
    { month: "Mar", workingHours: 380, projects: 300 },
    { month: "Apr", workingHours: 420, projects: 350 },
    { month: "May", workingHours: 450, projects: 400 },
    { month: "Jun", workingHours: 380, projects: 320 },
    { month: "Jul", workingHours: 400, projects: 350 },
    { month: "Aug", workingHours: 420, projects: 380 },
    { month: "Sep", workingHours: 450, projects: 400 },
    { month: "Oct", workingHours: 380, projects: 320 },
    { month: "Nov", workingHours: 480, projects: 450 },
    { month: "Dec", workingHours: 500, projects: 470 },
  ];

  return (
    <Card className="h-full bg-white shadow-lg border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Project Statistics
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700 hover:bg-orange-100"
            >
              12 Months
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              30 days
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              7 days
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              24 Hours
            </Badge>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4 p-3 bg-gray-800 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-300">Average 7 hr 12 mins</div>
              <div className="text-xs text-gray-300">Projects 3</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-300">Working Hours</div>
              <div className="text-xs text-gray-300">Projects</div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={defaultData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(value, name) => [
                  `${value}${name === "workingHours" ? " hrs" : " projects"}`,
                  name === "workingHours" ? "Working Hours" : "Projects",
                ]}
                labelStyle={{ color: "#333" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="workingHours"
                fill="#ff6b6b"
                radius={[2, 2, 0, 0]}
                maxBarSize={20}
              />
              <Bar
                dataKey="projects"
                fill="#e0e0e0"
                radius={[2, 2, 0, 0]}
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatistics;
