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
import Image from "next/image";
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
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/vercel.svg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-foreground">
              BillDee
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <svg
                  className="h-6 w-6"
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
            <SheetContent>
              <SheetHeader>
                <SheetTitle>เมนู</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-orange-100 dark:border-orange-500/10 pt-4 mt-4">
                    <Link href="/login">
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        size="lg"
                      >
                        เข้าสู่ระบบ
                      </Button>
                    </Link>
                    <Link href="/register" className="mt-2 block">
                      <Button
                        variant="outline"
                        className="w-full border-orange-200 hover:bg-orange-100 dark:border-orange-500/20 dark:hover:bg-orange-500/10"
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
