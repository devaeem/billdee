"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "หน้าแรก", href: "#" },
  { name: "คุณสมบัติ", href: "#features" },
  { name: "ราคา", href: "#pricing" },
  { name: "เกี่ยวกับเรา", href: "#about" },
  { name: "ติดต่อ", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-orange-100 dark:border-orange-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <div className="flex items-center gap-3 p-1">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg ring-2 ring-primary/10" />
            <span className="flex flex-col">
              <span className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-widest uppercase hover:text-orange-500 transition-colors duration-200">
                  BillDee
                </span>
              </span>
              <span className="text-xs font-bold text-muted-foreground tracking-wide">
                ระบบบิลออนไลน์และจัดการร้านค้า
              </span>
            </span>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-orange-100 dark:hover:bg-orange-500/10"
              >
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[350px] border-l border-orange-100 dark:border-orange-500/10">
              <SheetHeader className="border-b border-orange-100 dark:border-orange-500/10 pb-4">
                <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  เมนู
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-3 text-base font-medium text-muted-foreground hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-lg transition-all duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-orange-100 dark:border-orange-500/10 pt-6 mt-6 space-y-3">
                    <Link href="/login">
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200"
                        size="lg"
                      >
                        เข้าสู่ระบบ
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-orange-200 hover:bg-orange-100 dark:border-orange-500/20 dark:hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-200"
                        size="lg"
                      >
                        ลงทะเบียน
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
          <ThemeToggle />
          <div className="h-4 w-px bg-orange-200 dark:bg-orange-500/20" />
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              เข้าสู่ระบบ
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              ลงทะเบียน
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
