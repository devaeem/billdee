"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3 } from "lucide-react";

interface DashboardHeaderProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  const months = [
    { value: "01", label: "มกราคม" },
    { value: "02", label: "กุมภาพันธ์" },
    { value: "03", label: "มีนาคม" },
    { value: "04", label: "เมษายน" },
    { value: "05", label: "พฤษภาคม" },
    { value: "06", label: "มิถุนายน" },
    { value: "07", label: "กรกฎาคม" },
    { value: "08", label: "สิงหาคม" },
    { value: "09", label: "กันยายน" },
    { value: "10", label: "ตุลาคม" },
    { value: "11", label: "พฤศจิกายน" },
    { value: "12", label: "ธันวาคม" },
  ];

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">ภาพรวมธุรกิจ</h1>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">
          เลือกช่วงเวลา:
        </span>
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="เลือกเดือน" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardHeader;
