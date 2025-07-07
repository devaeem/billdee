"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20 -z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center gap-4 text-center">
            {/* Announcement Badge */}
            <div className="mx-auto rounded-full bg-orange-500/10 px-4 py-1.5 ring-1 ring-orange-500/20">
              <p className="text-sm font-medium text-orange-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                ระบบใหม่ล่าสุด 2024
              </p>
            </div>

            {/* Main Heading */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">
                ระบบจัดการร้านค้า
              </h1>
              <span className="text-foreground">
                ที่ดีที่สุดสำหรับธุรกิจของคุณ
              </span>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                จัดการร้านค้าของคุณได้ง่ายๆ ด้วยระบบที่ครบครัน
                พร้อมฟีเจอร์ที่ช่วยให้ธุรกิจของคุณเติบโตอย่างไม่มีขีดจำกัด
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50 transition-all duration-300"
              >
                <Link href="/login">
                  เริ่มต้นใช้งานฟรี
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-200 hover:bg-orange-100/50 dark:border-orange-500/20 dark:hover:bg-orange-500/10 transition-all duration-300"
              >
                <Link href="#features">ดูฟีเจอร์ทั้งหมด</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900"
                      style={{
                        backgroundColor: [
                          "#FEE2E2",
                          "#FEF3C7",
                          "#D1FAE5",
                          "#EFF6FF",
                        ][i],
                      }}
                    />
                  ))}
                </div>
                <span>+1,000 ผู้ใช้งาน</span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-orange-500">★★★★★</span>
                <span>4.9/5 คะแนนความพึงพอใจ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
