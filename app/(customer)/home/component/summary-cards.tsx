"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Clock } from "lucide-react";

interface ProjectMember {
  id: string;
  name: string;
  avatar: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  members: ProjectMember[];
}

interface SummaryData {
  totalRevenue: number;
  totalBills: number;
  costOfGoods: number;
  otherExpenses: number;
  expenseCount: number;
}

interface SummaryCardsProps {
  projects?: ProjectData[];
  data?: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ projects, data }) => {
  // Default project data if none provided
  const defaultProjects: ProjectData[] = [
    {
      id: "1",
      title: "Project Dashboard",
      description: "Create a dashboard design",
      updatedAt: "5 hours ago",
      members: [
        { id: "1", name: "John Doe", avatar: "/api/placeholder/32/32" },
        { id: "2", name: "Jane Smith", avatar: "/api/placeholder/32/32" },
      ],
    },
    {
      id: "2",
      title: "Create a style guide",
      description: "Style guide for the business",
      updatedAt: "5 hours ago",
      members: [
        { id: "3", name: "Mike Johnson", avatar: "/api/placeholder/32/32" },
        { id: "4", name: "Sarah Wilson", avatar: "/api/placeholder/32/32" },
      ],
    },
    {
      id: "3",
      title: "Create wireframes",
      description: "Wireframe for the agency",
      updatedAt: "5 hours ago",
      members: [
        { id: "5", name: "Alex Brown", avatar: "/api/placeholder/32/32" },
        { id: "6", name: "Lisa Davis", avatar: "/api/placeholder/32/32" },
      ],
    },
    {
      id: "4",
      title: "Create wireframes",
      description: "Wireframe for the agency",
      updatedAt: "5 hours ago",
      members: [
        { id: "5", name: "Alex Brown", avatar: "/api/placeholder/32/32" },
        { id: "6", name: "Lisa Davis", avatar: "/api/placeholder/32/32" },
      ],
    },
  ];

  const projectsToShow = projects || defaultProjects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projectsToShow.map((project) => (
        <Card
          key={project.id}
          className="bg-white border-0 border-gray-200 rounded-4xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
          <CardContent>
            {/* Header with title and menu */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {project.title}
              </h3>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Footer with update info and members */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated {project.updatedAt}</span>
              </div>

              {/* Member avatars */}
              <div className="flex -space-x-2">
                {project.members.map((member, index) => (
                  <div
                    key={member.id}
                    className={`relative ${index > 0 ? "ml-[-8px]" : ""}`}
                    style={{ zIndex: project.members.length - index }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
