"use client";

import React, { useState } from "react";
import DashboardHeader from "./dashboard-header";
import BusinessChart from "./business-chart";
import MonthlyTarget from "./monthly-target";
import ProjectStatistics from "./project-statistics";
import ProjectsSummary from "./projects-summary";
import ProjectsOverview from "./projects-overview";
import DailyTasks from "./daily-tasks";
import SummaryCards from "./summary-cards";

const MainHome = () => {
  const [selectedMonth, setSelectedMonth] = useState("11"); // พฤศจิกายน

  // ข้อมูลตัวอย่างสำหรับกราฟ (14 วันแรกของเดือน)
  const chartData = [
    { date: "1 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "2 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "3 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "4 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "5 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "6 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "7 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "8 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "9 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "10 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "11 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "12 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
    { date: "13 ม.ค.", revenue: 4244, cogs: 0, expenses: 0 }, // รายได้หลักในวันที่ 13
    { date: "14 ม.ค.", revenue: 0, cogs: 0, expenses: 0 },
  ];

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    // ที่นี่สามารถเพิ่ม logic สำหรับโหลดข้อมูลใหม่ตามเดือนที่เลือก
  };

  return (
    <>
      {/* Header พร้อม dropdown เลือกเดือน */}
      <DashboardHeader
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />

      <div className="w-full">
        <SummaryCards />
      </div>

      {/* แถวแรก: Monthly Target & Project Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Target - 1/3 */}
        <div className="lg:col-span-1">
          <MonthlyTarget />
        </div>

        {/* Project Statistics - 2/3 */}
        <div className="lg:col-span-2">
          <ProjectStatistics />
        </div>
      </div>

      {/* แถวที่สอง: Projects Summary, Projects Overview & Daily Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Summary */}
        <div className="lg:col-span-1">
          <ProjectsSummary />
        </div>

        {/* Projects Overview */}
        <div className="lg:col-span-1">
          <ProjectsOverview />
        </div>

        {/* Daily Tasks */}
        <div className="lg:col-span-1">
          <DailyTasks />
        </div>
      </div>

      {/* แถวที่สาม: Business Chart - Full Width */}
    </>
  );
};

export default MainHome;
