"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  ShoppingBagIcon,
  ReceiptIcon,
  BellIcon,
  SparklesIcon,
  SettingsIcon,
} from "lucide-react";

const navigation = [
  { name: "หน้าหลัก", href: "/customer/dashboard", icon: HomeIcon },
  { name: "สินค้า", href: "/customer/product", icon: ShoppingBagIcon },
  { name: "รายการบิล", href: "/customer/bill", icon: ReceiptIcon },
  { name: "บันทึกค่าใช้จ่าย", href: "/customer/notifications", icon: BellIcon },
  { name: "ตั้งค่าร้านค้า", href: "/customer/profile", icon: SettingsIcon },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-[100dvh] flex-col border-r bg-white">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <nav className="flex flex-col h-full">
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                      "group flex gap-x-3 rounded-md p-2.5 text-sm font-semibold leading-6 transition-all duration-200"
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive
                          ? "text-orange-600"
                          : "text-gray-400 group-hover:text-orange-600",
                        "h-5 w-5 shrink-0 transition-colors"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="sticky bottom-0 flex-shrink-0 px-3 py-4 border-t bg-white">
        <Link href="/customer/upgrade" className="block">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 cursor-pointer shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Upgrade to Pro
                </p>
                <p className="text-xs text-white/80">Get more features</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
