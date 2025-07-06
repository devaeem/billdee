"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "ฟรี",
    price: "0",
    description: "สำหรับธุรกิจขนาดเล็กที่เพิ่งเริ่มต้น",
    features: [
      "จัดการสินค้าพื้นฐาน",
      "ระบบขายหน้าร้าน",
      "รายงานการขายพื้นฐาน",
      "1 ผู้ใช้งาน",
      "จำกัด 100 รายการสินค้า",
      "สำรองข้อมูล 7 วัน",
    ],
    cta: "เริ่มต้นใช้งานฟรี",
    href: "/register",
  },
  {
    name: "มาตรฐาน",
    price: "99",
    description: "เหมาะสำหรับธุรกิจที่กำลังเติบโต",
    features: [
      "ทุกฟีเจอร์จากแพ็กเกจฟรี",
      "จัดการสต็อกสินค้า",
      "รายงานขั้นสูง",
      "5 ผู้ใช้งาน",
      "ไม่จำกัดรายการสินค้า",
      "สำรองข้อมูล 30 วัน",
      "ระบบสมาชิก",
      "ส่งออกรายงาน",
    ],
    cta: "เริ่มต้นใช้งาน",
    href: "/register?plan=standard",
    popular: true,
  },
  {
    name: "พรีเมียม",
    price: "299",
    description: "สำหรับธุรกิจขนาดใหญ่ที่ต้องการฟีเจอร์ครบครัน",
    features: [
      "ทุกฟีเจอร์จากแพ็กเกจมาตรฐาน",
      "ไม่จำกัดผู้ใช้งาน",
      "API สำหรับเชื่อมต่อระบบ",
      "รายงานแบบกำหนดเอง",
      "สำรองข้อมูลไม่จำกัด",
      "ระบบ CRM",
      "ระบบบัญชีขั้นสูง",
      "การสนับสนุน 24/7",
    ],
    cta: "ติดต่อฝ่ายขาย",
    href: "/contact-sales",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_top,theme(colors.orange.50),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-orange-600">
            ราคา
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            เลือกแพ็กเกจที่เหมาะกับคุณ
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            เริ่มต้นใช้งานฟรี และอัพเกรดเมื่อธุรกิจของคุณพร้อม
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card
                className={`relative h-full p-8 ${
                  tier.popular
                    ? "border-2 border-orange-500 shadow-xl"
                    : "border border-orange-100 dark:border-orange-800"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                    <Badge className="w-full py-1 bg-orange-500 hover:bg-orange-600">
                      แนะนำ
                    </Badge>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline text-foreground">
                    <span className="text-5xl font-bold tracking-tight">
                      {tier.price}
                    </span>
                    {tier.price !== "0" && (
                      <span className="ml-1 text-2xl font-medium text-muted-foreground">
                        ฿/เดือน
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-base text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <ul className="mb-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 text-orange-500">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.7071 6.70711L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L7 8.58579L10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href={tier.href} className="block">
                    <Button
                      className={`w-full h-12 text-base font-medium ${
                        tier.popular
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-orange-50 hover:bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 dark:text-orange-500"
                      }`}
                      variant={tier.popular ? "default" : "ghost"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-base text-muted-foreground">
            มีคำถามเพิ่มเติม?{" "}
            <Link
              href="/contact"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              ติดต่อทีมงาน
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
