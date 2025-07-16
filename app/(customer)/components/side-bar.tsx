"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowUp01Icon,
  BitcoinReceiptIcon,
  DashboardSquare01Icon,
  FlowIcon,
  Invoice03Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

type NavigationItem = {
  name: string;
  href: string;
  icon: IconSvgElement;
  subMenu?: {
    name: string;
    href: string;
    icon: IconSvgElement;
  }[];
};

export const navigation: NavigationItem[] = [
  {
    name: "หน้าแรก",
    href: "/home",
    icon: DashboardSquare01Icon,
  },
  { name: "สร้างบิล", href: "/create-bill", icon: Invoice03Icon },
  { name: "ค่าใช้จ่าย", href: "/expenses", icon: BitcoinReceiptIcon },
  {
    name: "ประวัติ",
    href: "/history",
    icon: FlowIcon,
  },
  {
    name: "ตั้งค่า",
    href: "/setting",
    icon: Settings02Icon,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const toggleSubMenu = (itemName: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(itemName)
        ? prev.filter((menu) => menu !== itemName)
        : [...prev, itemName]
    );
  };

  const proFeatures = [
    "ไม่จำกัดจำนวนสินค้า",
    "ไม่จำกัดจำนวนบิล",
    "รายงานยอดขายแบบละเอียด",
    "ระบบจัดการสต็อกสินค้า",
    "ระบบจัดการพนักงาน",
    "ส่งออกรายงานในรูปแบบ Excel",
  ];

  return (
    <div className="flex flex-col h-[100dvh] border-r border-slate-200 bg-white shadow-md">
      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <nav className="flex flex-col h-full ">
          <ul role="list" className="flex flex-col gap-6">
            {navigation.map((item: NavigationItem) => {
              const isActive = pathname === item.href;
              const isSubMenuOpen = openSubMenus.includes(item.name);

              return (
                <li key={item.name}>
                  <div className="flex flex-col w-full gap-4">
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (item.subMenu) {
                          toggleSubMenu(item.name);
                        }
                      }}
                      className={cn(
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                          : "text-gray-700 hover:bg-orange-200  hover:text-white",
                        "group flex items-center gap-6 rounded-md px-2 py-2 text-sm font-semibold leading-6 transition-all duration-200"
                      )}
                    >
                      <div className="flex flex-col items-center justify-between w-full gap-6">
                        <div className="flex flex-col items-center gap-2">
                          <HugeiconsIcon
                            icon={item.icon}
                            size={26}
                            className={cn(
                              isActive
                                ? "text-white"
                                : "text-gray-700 group-hover:text-orange-600",
                              " shrink-0 transition-colors font-extrabold"
                            )}
                            aria-hidden="true"
                          />
                          <p
                            className={cn(
                              "text-sm  font-bold text-muted-foreground transition-all duration-200 tracking-wider",
                              isActive && "text-white font-bold"
                            )}
                          >
                            {item.name}
                          </p>
                        </div>
                        {item.subMenu && (
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              toggleSubMenu(item.name);
                            }}
                          >
                            <HugeiconsIcon
                              icon={ArrowUp01Icon}
                              size={24}
                              className={cn(
                                "cursor-pointer transition-transform duration-300",
                                isActive ? "text-white" : "text-gray-700",
                                isSubMenuOpen ? "rotate-0" : "rotate-180"
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                    {item.subMenu && (
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          isSubMenuOpen
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <ul className="ml-6 mt-2 space-y-1">
                          {item.subMenu.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    isSubActive
                                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                                    "group flex items-center gap-2 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200"
                                  )}
                                >
                                  <HugeiconsIcon
                                    icon={subItem.icon}
                                    size={20}
                                    className={cn(
                                      isSubActive
                                        ? "text-white"
                                        : "text-gray-700 group-hover:text-orange-600",
                                      "h-4 w-4 shrink-0 transition-colors"
                                    )}
                                  />
                                  <span
                                    className={cn(
                                      "text-sm font-medium text-muted-foreground transition-all duration-200",
                                      isSubActive && "text-white font-semibold"
                                    )}
                                  >
                                    {subItem.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* <div className="sticky bottom-0 flex-shrink-0 px-4 pb-4 bg-white">
        <div
          onClick={() => setIsProModalOpen(true)}
          className="block cursor-pointer"
        >
          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-3 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 shadow-md group">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded-xl bg-white/25 flex items-center justify-center backdrop-blur-lg group-hover:bg-white/30 transition-colors">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white tracking-wide">
                  Billdee Pro
                </p>
                <p className="text-xs text-white/90 font-medium">
                  อัพเกรดเพื่อปลดล็อกฟีเจอร์พิเศษ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        title="Billdee Pro"
        className="sm:max-w-[600px]"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">
              ยกระดับธุรกิจของคุณด้วย Billdee Pro
            </h3>
            <p className="text-gray-600">
              เพิ่มประสิทธิภาพการทำงานและการจัดการร้านค้าของคุณ
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            {proFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2Icon className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">฿399</span>
              <span className="text-gray-600 ml-2">/เดือน</span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              size="lg"
            >
              เริ่มใช้งาน Billdee Pro
            </Button>

            <p className="mt-4 text-sm text-gray-500">
              ยกเลิกได้ทุกเมื่อ ไม่มีข้อผูกมัด
            </p>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default Sidebar;
