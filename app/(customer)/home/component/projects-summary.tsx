"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  MoreHorizontal,
  Users,
  CheckCircle,
  Clock,
  Circle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectItem {
  id: string;
  name: string;
  members: number;
  status: "completed" | "in_progress" | "pending";
}

interface ProjectsSummaryProps {
  projects?: ProjectItem[];
}

const ProjectsSummary: React.FC<ProjectsSummaryProps> = ({ projects }) => {
  const defaultProjects: ProjectItem[] = [
    { id: "1", name: "Tiddo App", members: 19, status: "in_progress" },
    {
      id: "2",
      name: "Homie SAAS Application",
      members: 24,
      status: "in_progress",
    },
    { id: "3", name: "In Progress", members: 22, status: "in_progress" },
    { id: "4", name: "Completed", members: 10, status: "completed" },
  ];

  const projectsData = projects || defaultProjects;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in_progress":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="h-full bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Projects Summary
          </CardTitle>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  project.status === "completed"
                    ? "bg-green-100"
                    : project.status === "in_progress"
                    ? "bg-orange-100"
                    : "bg-gray-100"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={`text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-green-500 text-white"
                        : project.status === "in_progress"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {project.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div>
                <div className="font-medium text-gray-900">{project.name}</div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{project.members} Members</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getStatusIcon(project.status)}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}

        {/* Summary stats */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">22</div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">10</div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">124</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsSummary;
