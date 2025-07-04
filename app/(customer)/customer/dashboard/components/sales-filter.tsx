"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SalesFilter = () => {
  return (
    <Card className="col-span-7">
      <CardContent className="pt-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateRange">ช่วงเวลา</Label>
            <Select defaultValue="thisMonth">
              <SelectTrigger>
                <SelectValue placeholder="เลือกช่วงเวลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">เดือนนี้</SelectItem>
                <SelectItem value="lastMonth">เดือนที่แล้ว</SelectItem>
                <SelectItem value="last3Months">3 เดือนที่ผ่านมา</SelectItem>
                <SelectItem value="thisYear">ปีนี้</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minSales">ยอดขายต่ำสุด</Label>
            <Input
              id="minSales"
              type="number"
              placeholder="ระบุยอดขายต่ำสุด"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxSales">ยอดขายสูงสุด</Label>
            <Input
              id="maxSales"
              type="number"
              placeholder="ระบุยอดขายสูงสุด"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store">ร้านค้า</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="เลือกร้านค้า" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="storeA">ร้านค้า A</SelectItem>
                <SelectItem value="storeB">ร้านค้า B</SelectItem>
                <SelectItem value="storeC">ร้านค้า C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesFilter;
