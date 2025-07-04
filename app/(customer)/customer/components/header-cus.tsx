"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconUserCircle,
  IconLogout,
  IconHome,
  IconFileInvoice,
  IconPackage,
  IconMenu2,
  IconSettings,
  IconBell,
} from "@tabler/icons-react";
import { useProfile } from "@/hooks/use-profile";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import axiosInstance from "@/app/utils/axios";

const HeaderCus = () => {
  const { data: profile } = useProfile();

  const pathname = usePathname();

  const navigation = [
    {
      name: "หน้าแรก",
      href: "/customer",
      icon: IconHome,
    },
    {
      name: "จัดการบิล",
      href: "/customer/bill",
      icon: IconFileInvoice,
    },
    {
      name: "สินค้า",
      href: "/customer/product",
      icon: IconPackage,
    },
  ];

  const handleLogout = async () => {
    await axiosInstance.post("/sign-out");

    await signOut({
      callbackUrl: "/",

      redirect: true,
    });
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Left side - Website Name */}
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg ring-2 ring-primary/10" />
        <span className="text-xl font-semibold tracking-tight">BillDee</span>
      </div>
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <IconMenu2 className="size-5" />
            <VisuallyHidden.Root>เมนู</VisuallyHidden.Root>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex w-72 flex-col gap-1">
          <SheetHeader className="px-4 py-1 mt-2">
            <SheetTitle>
              <div className="flex items-center gap-3 p-1">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg ring-2 ring-primary/10" />
                <span className="text-xl font-semibold tracking-tight">
                  BillDee
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-1 flex-col space-y-2  pt-1 px-2">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                      "group flex gap-x-3 rounded-md p-2.5 text-sm font-semibold leading-6 transition-all duration-200"
                    )}
                  >
                    <Icon className="size-4.5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <SheetFooter className="border-t px-2 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent">
                  <Avatar className="h-8 w-8 rounded-full border-2 border-primary/10 md:h-9 md:w-9">
                    <AvatarImage
                      src={profile?.data?.avatar}
                      alt={profile?.data?.firstName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/5">
                      {profile?.data?.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left text-sm leading-tight md:grid">
                    <span className="font-medium">
                      {profile?.data?.firstName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {profile?.data?.email}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconUserCircle className="mr-2 size-4" />
                    <span>โปรไฟล์</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500"
                >
                  <IconLogout className="mr-2 size-4" />
                  <span>ออกจากระบบ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* Right side - Profile */}
      {/* settimgicon and notification */}
      <div className=" items-center gap-3 hidden sm:hidden md:flex">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <IconSettings className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <IconBell className="size-5" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:hidden md:flex">
            <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent">
              <Avatar className="h-8 w-8 rounded-full border-2 border-primary/10 md:h-9 md:w-9">
                <AvatarImage
                  src={profile?.data?.avatar}
                  alt={profile?.data?.firstName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/5">
                  {profile?.data?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left text-sm leading-tight md:grid">
                <span className="font-medium">{profile?.data?.firstName}</span>
                <span className="text-xs text-muted-foreground">
                  {profile?.data?.email}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle className="mr-2 size-4" />
                <span>โปรไฟล์</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500"
            >
              <IconLogout className="mr-2 size-4" />
              <span>ออกจากระบบ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HeaderCus;
