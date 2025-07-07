"use client";

import { Card } from "@/components/ui/card";

const features = [
  {
    name: "POS ระบบขายหน้าร้าน",
    description: "ระบบขายหน้าร้านที่ใช้งานง่าย รวดเร็ว และมีประสิทธิภาพ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
        />
      </svg>
    ),
  },
  {
    name: "จัดการสินค้าคงคลัง",
    description:
      "ติดตามสต็อกสินค้า ตั้งค่าจุดสั่งซื้อ และจัดการสินค้าคงคลังได้อย่างง่ายดาย",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    ),
  },
  {
    name: "รายงานและการวิเคราะห์",
    description: "รายงานโดยละเอียดและข้อมูลเชิงลึกเพื่อช่วยในการตัดสินใจ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-orange-600">
            ฟีเจอร์ที่ครบครัน
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            ทุกสิ่งที่คุณต้องการ
            <br />
            สำหรับการจัดการร้านค้า
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            ตั้งแต่การจัดการสินค้าคงคลังไปจนถึงการติดตามยอดขาย
            เรามีเครื่องมือที่ครบครันพร้อมให้คุณใช้งาน
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <Card className="p-8 h-full bg-gradient-to-b from-orange-50/50 to-background dark:from-orange-500/5 dark:to-background border-orange-100 hover:border-orange-200 dark:border-orange-500/10 dark:hover:border-orange-500/20 transition-all duration-300">
                <div className="relative flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>

                  {/* Decorative arrow */}
                  <div className="mt-6 flex items-center text-orange-600 group-hover:translate-x-1 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 8h12m0 0L9 4m4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-orange-50 to-orange-50/20 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-100 dark:border-orange-500/10">
            <div className="text-4xl font-bold text-orange-600 mb-2">XX+</div>
            <div className="text-sm text-muted-foreground">
              ร้านค้าที่ไว้วางใจเรา
            </div>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-orange-50 to-orange-50/20 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-100 dark:border-orange-500/10">
            <div className="text-4xl font-bold text-orange-600 mb-2">XX</div>
            <div className="text-sm text-muted-foreground">
              พร้อมให้บริการตลอดเวลา
            </div>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-orange-50 to-orange-50/20 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-100 dark:border-orange-500/10">
            <div className="text-4xl font-bold text-orange-600 mb-2">XX%</div>
            <div className="text-sm text-muted-foreground">
              อัตราความพึงพอใจ
            </div>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-orange-50 to-orange-50/20 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-100 dark:border-orange-500/10">
            <div className="text-4xl font-bold text-orange-600 mb-2">XX</div>
            <div className="text-sm text-muted-foreground">ธุรกรรมต่อวัน</div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.orange.50),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.orange.500/0.05),transparent)]" />
    </section>
  );
};

export default FeaturesSection;
