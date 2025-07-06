"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative isolate pt-14 dark:bg-transparent">
      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-500 to-orange-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-orange-500">
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
                      d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                    />
                  </svg>
                </span>
                <span className="text-orange-500 font-medium">
                  Product of the day
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 text-sm">
                XXth
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              ระบบจัดการร้านค้า
              <span className="text-orange-500">ที่ดีที่สุด</span>
              <br />
              สำหรับธุรกิจของคุณ
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              จัดการร้านค้าของคุณได้ง่ายๆ ด้วยระบบที่ครบครัน ทั้งการขาย
              การจัดการสต็อก และรายงานที่ช่วยให้คุณตัดสินใจได้ดียิ่งขึ้น
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex items-center gap-x-6"
          >
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
            >
              <Link href="/login">เริ่มต้นใช้งานฟรี</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="group">
              <Link href="#features" className="flex items-center gap-2">
                ดูฟีเจอร์ทั้งหมด
                <span className="group-hover:translate-x-1 transition-transform">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8h12m0 0L9 4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 flex items-center gap-x-8"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
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
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-orange-500">
                <span>★★★★★</span>
              </div>
              <span className="text-sm text-muted-foreground">
                (XX users are using)
              </span>
            </div>
          </motion.div>
        </div>

        {/* Preview Image */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative w-[40rem] h-[35rem] rounded-xl border border-orange-100 dark:border-orange-500/10 bg-gradient-to-br from-orange-50/50 to-background dark:from-orange-500/5 dark:to-background p-8 [mask-image:linear-gradient(to_bottom,white_60%,transparent)]">
              {/* Add preview content here */}
              <div className="absolute inset-0 flex items-center justify-center text-orange-500/20 dark:text-orange-500/10 text-9xl font-bold">
                PREVIEW
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration (bottom) */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-orange-500 to-orange-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  );
}
