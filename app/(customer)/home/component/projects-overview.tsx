"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ProjectsOverviewProps {
  data?: {
    percentage: number;
    totalProjects: number;
    members: number;
    label: string;
  };
}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ data }) => {
  const defaultData = data || {
    percentage: 65,
    totalProjects: 16,
    members: 3,
    label: "App Design",
  };

  const chartData = [
    { name: "Progress", value: defaultData.percentage, color: "#ff6b6b" },
    {
      name: "Remaining",
      value: 100 - defaultData.percentage,
      color: "#26c6da",
    },
  ];

  // Create gradient colors for the circular progress
  const gradientColors = [
    "#ff6b6b", // red/pink
    "#ff9f40", // orange
    "#ffd93d", // yellow
    "#6bcf7f", // green
    "#26c6da", // cyan
    "#9c4dcc", // purple
  ];

  return (
    <Card className="h-full bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Projects Overview
          </CardTitle>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {/* Circular Progress Chart */}
        <div className="relative w-48 h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="20%" stopColor="#ff9f40" />
                  <stop offset="40%" stopColor="#ffd93d" />
                  <stop offset="60%" stopColor="#6bcf7f" />
                  <stop offset="80%" stopColor="#26c6da" />
                  <stop offset="100%" stopColor="#9c4dcc" />
                </linearGradient>
              </defs>
              <Pie
                data={[
                  {
                    value: defaultData.percentage,
                    color: "url(#progressGradient)",
                  },
                  { value: 100 - defaultData.percentage, color: "#f0f0f0" },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="url(#progressGradient)" />
                <Cell fill="#f0f0f0" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {defaultData.percentage}%
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {defaultData.label}
            </div>
          </div>
        </div>

        {/* Project info */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>
              {defaultData.totalProjects} Total Projects - {defaultData.members}{" "}
              Members
            </span>
          </div>
        </div>

        {/* Additional circular indicators */}
        <div className="mt-6 flex justify-center space-x-2">
          {gradientColors.map((color, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsOverview;
