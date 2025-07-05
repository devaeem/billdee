import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <div className="relative w-64 h-64 mx-auto mb-8 animate-bounce-slow">
          <Image
            src="/404-illustration.svg"
            alt="404 Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-7xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tight">
          ไม่พบหน้าที่คุณต้องการ
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา กรุณาตรวจสอบ URL
          อีกครั้งหรือกลับไปยังหน้าหลัก
        </p>
        <Link href="/" className="inline-block">
          <Button
            size="lg"
            className="mt-4 font-medium hover:scale-105 transition-transform"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            กลับไปหน้าหลัก
          </Button>
        </Link>
      </div>
    </div>
  );
}
