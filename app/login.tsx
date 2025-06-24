"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Receipt } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />

      <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
        <Card className="w-full shadow-lg border-0 bg-white">
          <CardHeader className="flex flex-col items-center gap-2 px-4 sm:px-6 md:px-8">
            <div className="flex justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Receipt className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gray-600" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription className="text-center text-gray-500 text-sm sm:text-base">
              จัดการบิลและค่าใช้จ่ายของคุณได้ง่ายๆ ในที่เดียว
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 md:px-8">
            <form className="mt-2">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    อีเมล
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    className="h-10 sm:h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    รหัสผ่าน
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="h-10 sm:h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                    >
                      จดจำฉันไว้
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 md:px-8">
            <Button className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-medium transition-all duration-200">
              เข้าสู่ระบบ
            </Button>
            <p className="text-center text-sm text-gray-600">
              ยังไม่มีบัญชี?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                สมัครสมาชิก
              </a>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-4 sm:mt-5 md:mt-6 text-center text-xs sm:text-sm text-gray-500 space-y-1">
          <p>จัดการบิลและค่าใช้จ่ายออนไลน์ได้ง่ายๆ ด้วย BillDee</p>
          <p>ระบบที่ช่วยให้การจัดการการเงินของคุณเป็นเรื่องง่าย</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
