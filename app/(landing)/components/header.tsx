"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Store02Icon } from "@hugeicons/core-free-icons";
import Btn from "@/components/custom-ui/btn";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

export default function Header() {
  const navItems = [
    { href: "#products", label: "Products" },
    { href: "#about", label: "About us" },
    { href: "#resources", label: "Resources" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200/80 shadow-sm">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <HugeiconsIcon
                icon={Store02Icon}
                size={40}
                className="text-emerald-500 group-hover:text-emerald-600 transition-all duration-500 ease-out"
                strokeWidth={2}
              />
            </motion.div>
            <span className="text-3xl font-extrabold tracking-wide uppercase text-emerald-500 group-hover:text-emerald-600 transition-all duration-500 ease-out">
              BillDee
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-base font-bold text-gray-600 transition-all duration-500 ease-out hover:text-gray-900"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-500 ease-out group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href="/contact">
                  <Btn
                    size="sm"
                    className="rounded-full px-6 py-2 text-emerald-500 border-emerald-500 border-2 bg-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 hover:text-white hover:border-transparent transition-all duration-500 ease-out shadow-sm hover:shadow-md"
                  >
                    Contact Us
                  </Btn>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <VisuallyHidden>
                <SheetTitle>Menu</SheetTitle>
              </VisuallyHidden>
              <SheetTrigger asChild className="md:hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Btn
                    size="icon"
                    variant="ghost"
                    className="text-emerald-500 p-1.5 hover:bg-emerald-50 transition-all duration-500 ease-out"
                  >
                    <HugeiconsIcon
                      icon={Menu01Icon}
                      size={24}
                      className="text-emerald-500"
                      strokeWidth={2}
                    />
                  </Btn>
                </motion.div>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:w-[300px] border-l border-gray-200/80 bg-white/95 backdrop-blur-sm"
              >
                <div className="flex flex-col gap-8 pt-10 px-6">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.href}
                      whileHover={{ x: 8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-gray-600 transition-all duration-500 ease-out hover:text-gray-900 uppercase tracking-wide hover:font-bold"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="flex flex-col gap-4 justify-end">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link href="/contact">
                        <Button className="w-full rounded-full border-1 font-bold border-emerald-500 bg-white text-emerald-500 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 hover:text-white hover:border-transparent transition-all duration-500 ease-out shadow-sm hover:shadow-md">
                          Contact Us
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
