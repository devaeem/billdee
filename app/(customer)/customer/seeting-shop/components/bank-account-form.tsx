"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BankAccountForm() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">ข้อมูลบัญชีธนาคาร</h2>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountName">ชื่อบัญชี</Label>
          <Input id="accountName" placeholder="กรอกชื่อบัญชี" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bank">ธนาคาร</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="เลือกธนาคาร" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kbank">ธนาคารกสิกรไทย</SelectItem>
              <SelectItem value="scb">ธนาคารไทยพาณิชย์</SelectItem>
              <SelectItem value="bbl">ธนาคารกรุงเทพ</SelectItem>
              <SelectItem value="ktb">ธนาคารกรุงไทย</SelectItem>
              <SelectItem value="bay">ธนาคารกรุงศรีอยุธยา</SelectItem>
              <SelectItem value="tmb">ธนาคารทหารไทยธนชาต</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">เลขบัญชี</Label>
          <Input
            id="accountNumber"
            placeholder="กรอกเลขบัญชี"
            type="text"
            pattern="[0-9]*"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="promptpay">พร้อมเพย์</Label>
          <Input
            id="promptpay"
            placeholder="กรอกเบอร์พร้อมเพย์"
            type="text"
            pattern="[0-9]*"
          />
        </div>
      </div>

      <Button className="w-full">บันทึก</Button>
    </div>
  );
}
