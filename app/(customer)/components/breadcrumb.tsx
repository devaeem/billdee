"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routes: Record<string, string> = {
  "/home": "ภาพรวมธุรกิจ",
  "/create-bill": "สร้างบิล",
  "/expenses": "ค่าใช้จ่าย",
  "/history": "ประวัติ",
  "/setting": "ตั้งค่า",
};

export function BreadcrumbDemo() {
  const pathname = usePathname();
  console.log("pathname", pathname);

  // Split the current path into segments and remove empty strings
  const segments = pathname.split("/").filter(Boolean);
  console.log("segments", segments);

  // Build up the breadcrumb paths
  const breadcrumbs = segments.map((_, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    return {
      href: path,
      label: routes[path] || segments[index],
    };
  });
  console.log("breadcrumbs", breadcrumbs.slice(1));

  return (
    <div className="flex items-center md:justify-between justify-start gap-2 w-full">
      <Breadcrumb className="w-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="text-sm font-bold tracking-wider" href="/home">
                หน้าหลัก
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => (
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
    </div>
  );
}
