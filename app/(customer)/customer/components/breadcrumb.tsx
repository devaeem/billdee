"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { th } from "date-fns/locale";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routes: Record<string, string> = {
  "/customer": "หน้าหลัก",
  "/customer/dashboard": "แดชบอร์ด",
  "/customer/product": "สินค้า",
  "/customer/bill": "รายการบิล",
  "/customer/bill/create": "สร้างบิล",
  "/customer/record-expenses": "บันทึกค่าใช้จ่าย",
  "/customer/record-expenses/create": "สร้างรายการค่าใช้จ่าย",
  "/customer/seeting-shop": "ตั้งค่าร้านค้า",
  "/customer/profile-user": "โปรไฟล์",
};

const thaiDayNames = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
];

export function BreadcrumbDemo() {
  const pathname = usePathname();

  // Split the current path into segments
  const segments = pathname.split("/").filter(Boolean);

  // Build up the breadcrumb paths
  const breadcrumbs = segments.map((_, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    return {
      href: path,
      label: routes[path] || segments[index],
    };
  });

  const today = new Date();
  const thaiDate = format(today, "d MMMM yyyy", { locale: th });
  const dayName = thaiDayNames[today.getDay()];

  return (
    <div className="flex items-center md:justify-between justify-start gap-2 w-full">
      <Breadcrumb className="w-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="text-sm font-bold tracking-wider"
                href="/customer"
              >
                หน้าหลัก
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.slice(1).map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === breadcrumbs.length - 2 ? (
                  <BreadcrumbPage className="text-sm font-bold tracking-wider">
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className="text-sm font-bold tracking-wider"
                      href={breadcrumb.href}
                    >
                      {breadcrumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <h1 className="text-sm text-muted-foreground hidden sm:hidden md:block lg:block">
        วัน{dayName}ที่ {thaiDate}
      </h1> */}
    </div>
  );
}
