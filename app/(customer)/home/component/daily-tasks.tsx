"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TaskMember {
  id: string;
  name: string;
  avatar?: string;
}

interface DailyTask {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  members: TaskMember[];
  type: "design" | "development" | "meeting";
}

interface DailyTasksProps {
  tasks?: DailyTask[];
  selectedPeriod?: string;
}

const DailyTasks: React.FC<DailyTasksProps> = ({
  tasks,
  selectedPeriod = "Today",
}) => {
  const defaultTasks: DailyTask[] = [
    {
      id: "1",
      title: "Tiddo Mobile App Web Version",
      description: "We've to design a dashboard for DevingEdge Design Agency.",
      updatedAt: "2 Hours ago",
      members: [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ],
      type: "design",
    },
    {
      id: "2",
      title: "Scrum Call Discussion",
      description: "We've to design a dashboard for DevingEdge Design Agency.",
      updatedAt: "5 Hours ago",
      members: [
        { id: "3", name: "Mike Johnson" },
        { id: "4", name: "Sarah Wilson" },
      ],
      type: "meeting",
    },
  ];

  const tasksData = tasks || defaultTasks;

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case "design":
        return "bg-purple-100 text-purple-700";
      case "development":
        return "bg-blue-100 text-blue-700";
      case "meeting":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="h-full bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Daily Tasks
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700 hover:bg-orange-100"
            >
              {selectedPeriod}
            </Badge>
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {tasksData.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {task.title}
              </h3>
              <Badge className={`text-xs ${getTaskTypeColor(task.type)}`}>
                {task.type}
              </Badge>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {task.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>Updated {task.updatedAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {task.members.slice(0, 2).map((member, index) => (
                    <Avatar
                      key={member.id}
                      className="w-6 h-6 border-2 border-white"
                    >
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-purple-600 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {task.members.length > 2 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600 font-medium">
                        +{task.members.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Quick actions or summary */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total Tasks Today</span>
            <span className="font-semibold text-gray-900">
              {tasksData.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTasks;
