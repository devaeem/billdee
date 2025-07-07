"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate rounded-[2rem] bg-orange-50 dark:bg-orange-500/5">
          {/* Decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.orange.100),transparent)]" />
          </div>

          <div className="mx-auto max-w-4xl px-8 py-16 sm:px-12 sm:py-24">
            <div className="flex flex-col items-center text-center gap-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5">
                <span className="text-orange-600 font-medium">
                  ✨ New Feature
                </span>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                  เริ่มต้นใช้งานฟรีวันนี้
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                  เข้าร่วมกับผู้ประกอบการกว่า 10,000 ราย
                  ที่ไว้วางใจให้เราดูแลธุรกิจของพวกเขา
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg h-12"
                  >
                    ทดลองใช้งานฟรี 14 วัน
                  </Button>
                </Link>
                <Link href="#features" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-12 text-lg border-orange-200 hover:bg-orange-100 dark:border-orange-500/20 dark:hover:bg-orange-500/10"
                  >
                    ดูรายละเอียดเพิ่มเติม
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  ไว้วางใจโดยบริษัทชั้นนำ
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-24 rounded bg-orange-100/50 dark:bg-orange-500/10"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
              <svg
                className="h-[40rem] w-[80rem] flex-none stroke-orange-200 dark:stroke-orange-500/20"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width="200"
                    height="200"
                    x="50%"
                    y="50%"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(-100 0)"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="50%"
                  y="50%"
                  className="overflow-visible fill-orange-50/20 dark:fill-orange-500/10"
                >
                  <path
                    d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                    strokeWidth="0"
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
