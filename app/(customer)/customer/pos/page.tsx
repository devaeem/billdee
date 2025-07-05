"use client";

import Image from "next/image";

export default function POSPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Image
            src="/404-illustration.svg"
            alt="Development"
            width={400}
            height={400}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚧 อยู่ระหว่างการพัฒนา 🚧
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            ขณะนี้เรากำลังพัฒนาระบบ POS เพื่อให้ตอบโจทย์การใช้งานของคุณมากที่สุด
          </p>
        </div>
      </div>
    </div>
  );
}
