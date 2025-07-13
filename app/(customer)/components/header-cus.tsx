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
  IconMenu2,
  IconSettings,
  IconBell,
  IconCircleCheck,
  IconClock,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useProfile } from "@/hooks/use-profile";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { navigation } from "./side-bar";
import { HugeiconsIcon } from "@hugeicons/react";

const getBackgroundColor = (letter: string = "") => {
  const normalizedLetter = letter.toLowerCase();

  if (["a", "b", "c", "d"].includes(normalizedLetter)) return "bg-blue-400";
  if (["e", "f", "g", "h"].includes(normalizedLetter)) return "bg-green-400";
  if (["i", "j", "k", "l"].includes(normalizedLetter)) return "bg-yellow-400";
  if (["m", "n", "o", "p"].includes(normalizedLetter)) return "bg-red-400";
  if (["q", "r", "s", "t"].includes(normalizedLetter)) return "bg-purple-400";
  if (["u", "v", "w", "x"].includes(normalizedLetter)) return "bg-pink-400";
  if (["y", "z"].includes(normalizedLetter)) return "bg-orange-400";
  return "bg-gray-400";
};

const HeaderCus = () => {
  const { data: profile, isLoading } = useProfile();
  const router = useRouter();
  const pathname = usePathname();

  // Add subscription level mapping with proper typing
  type SubscriptionType = "SPARK" | "FLOOR" | "MOMO" | "INFINITY";

  // Get subscription type from profile data or default to FREE
  const getUserSubscriptionType = (): SubscriptionType => {
    // ตรวจสอบว่ามี profile และ subscription type หรือไม่
    if (!profile?.data?.subscriptionType) return "SPARK";

    // แปลงค่า subscription type จาก profile ให้ตรงกับ SubscriptionType
    const type =
      profile.data.subscriptionType.toUpperCase() as SubscriptionType;

    // ตรวจสอบว่าค่าที่ได้ตรงกับ type ที่กำหนดไว้หรือไม่
    if (["SPARK", "FLOOR", "MOMO", "INFINITY"].includes(type)) {
      return type;
    }

    // ถ้าไม่ตรงกับ type ที่กำหนด ให้ return ค่า default
    return "SPARK";
  };

  const subscriptionLevel = {
    type: getUserSubscriptionType(), // ดึงค่า subscription type จาก profile
    styles: {
      SPARK:
        "bg-orange-500 hover:bg-orange-600 text-[10px] font-bold tracking-wider",
      FLOOR:
        "bg-emerald-500 hover:bg-emerald-600 text-[10px] font-bold tracking-wider",
      MOMO: "bg-sky-500 hover:bg-sky-600 text-[10px] font-bold tracking-wider",
      INFINITY:
        "bg-indigo-600 hover:bg-indigo-700 text-[10px] font-bold tracking-wider",
    } as const,
  };

  const handleLogout = async () => {
    await axiosInstance.post("/sign-out");

    await signOut({
      callbackUrl: "/",

      redirect: true,
    });
  };

  // Mock notifications data with categories
  const notifications = {
    new: [
      {
        id: 1,
        title: "บิลใหม่ถูกสร้าง",
        description: "บิลเลขที่ #INV-001 ถูกสร้างเรียบร้อยแล้ว",
        time: "2 นาทีที่แล้ว",
        type: "success",
        category: "bill",
        read: false,
      },
      {
        id: 2,
        title: "การชำระเงิน",
        description: "ได้รับการชำระเงินจากลูกค้า จำนวน ฿1,500",
        time: "1 ชั่วโมงที่แล้ว",
        type: "info",
        category: "payment",
        read: false,
      },
    ],
    earlier: [
      {
        id: 3,
        title: "แจ้งเตือนสินค้า",
        description: "สินค้า 'น้ำดื่ม' เหลือน้อยกว่า 10 ชิ้น",
        time: "2 ชั่วโมงที่แล้ว",
        type: "warning",
        category: "inventory",
        read: true,
      },
      {
        id: 4,
        title: "อัพเดทระบบ",
        description: "ระบบได้รับการอัพเดทเป็นเวอร์ชั่นใหม่",
        time: "1 วันที่แล้ว",
        type: "info",
        category: "system",
        read: true,
      },
    ],
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <IconCircleCheck className="size-4 text-emerald-500" />;
      case "warning":
        return <IconAlertCircle className="size-4 text-amber-500" />;
      default:
        return <IconClock className="size-4 text-blue-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "bill":
        return "บิล";
      case "payment":
        return "การชำระเงิน";
      case "inventory":
        return "สินค้าคงคลัง";
      case "system":
        return "ระบบ";
      default:
        return "ทั่วไป";
    }
  };

  const getTotalUnreadCount = () => {
    return (
      notifications.new.filter((n) => !n.read).length +
      notifications.earlier.filter((n) => !n.read).length
    );
  };

  const renderNotificationSection = (
    title: string,
    items: typeof notifications.new
  ) => (
    <>
      <div className="px-2 py-1.5">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
      </div>
      {items.map((notification) => (
        <DropdownMenuItem
          key={notification.id}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 transition-colors",
            notification.read ? "opacity-70" : "bg-accent/40 hover:bg-accent"
          )}
        >
          <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{notification.title}</p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                {getCategoryLabel(notification.category)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {notification.description}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground">
              {notification.time}
            </p>
          </div>
        </DropdownMenuItem>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 shadow-md">
      {/* Left side - Website Name */}
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg ring-2 ring-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50" />
        <span className="flex flex-col">
          <span className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-widest uppercase hover:text-orange-500 transition-colors duration-200">
              BillDee
            </span>
            <Badge
              className={cn(
                "text-white font-extrabold uppercase px-1 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105",
                subscriptionLevel.styles[subscriptionLevel.type]
              )}
            >
              {subscriptionLevel.type}
            </Badge>
          </span>
          <span className="text-xs font-bold text-muted-foreground tracking-wide">
            ระบบบิลออนไลน์ | จัดการบิลและค่าใช้จ่าย
          </span>
        </span>
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
                <span className="flex flex-col">
                  <span className="flex items-center gap-2">
                    <span className="text-xl font-extrabold tracking-widest uppercase hover:text-orange-500 transition-colors duration-200">
                      BillDee
                    </span>
                    <Badge
                      className={cn(
                        "text-white font-extrabold uppercase px-1 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105",
                        subscriptionLevel.styles[subscriptionLevel.type]
                      )}
                    >
                      {subscriptionLevel.type}
                    </Badge>
                  </span>
                  <span className="text-xs font-bold text-muted-foreground tracking-wide">
                    ระบบบิลออนไลน์และจัดการร้านค้า
                  </span>
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-1 flex-col space-y-2  pt-1 px-2">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                      "group flex items-center gap-x-3 rounded-md p-2.5 text-sm font-semibold leading-6 transition-all duration-200"
                    )}
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={24}
                      className={cn(
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-orange-600",
                        "h-5 w-5 shrink-0 transition-colors"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "text-sm font-bold  text-muted-foreground transition-all duration-200 tracking-wider",
                        isActive && "text-white font-bold"
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <SheetFooter className="border-t px-2 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 hover:bg-accent/80 hover:shadow-sm active:scale-95">
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full border-2 border-primary/10 shadow-sm transition-transform duration-200 hover:scale-105 md:h-9 md:w-9">
                    <AvatarImage
                      src={profile?.data?.avatar}
                      alt={profile?.data?.firstName}
                      className="object-cover"
                    />
                    <AvatarFallback
                      className={cn(
                        getBackgroundColor(profile?.data?.firstName?.charAt(0)),
                        "uppercase text-white font-semibold text-base tracking-wider animate-in fade-in-0 zoom-in-95 duration-200"
                      )}
                    >
                      {profile?.data?.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className=" flex flex-col text-left text-sm leading-tight transition-opacity duration-200 md:grid">
                    <span className="font-bold">
                      {profile?.data?.firstName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {profile?.data?.email}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 p-1"
                align="end"
                sideOffset={8}
                alignOffset={0}
                forceMount
              >
                <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  บัญชีของฉัน
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 bg-muted/60" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent focus:bg-accent">
                    <IconUserCircle className="size-4 text-muted-foreground" />
                    <span>โปรไฟล์</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1 bg-muted/60" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <IconLogout className="size-4" />
                  <span>ออกจากระบบ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* Right side - Profile */}
      <div className="items-center gap-3 hidden sm:hidden md:flex">
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-transform hover:scale-105"
                >
                  <IconSettings className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ตั้งค่า</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative transition-transform hover:scale-105"
                    >
                      <IconBell className="size-5" />
                      {getTotalUnreadCount() > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">
                          {getTotalUnreadCount()}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>การแจ้งเตือน</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent
              className="w-80 p-1"
              align="end"
              sideOffset={8}
              alignOffset={0}
              forceMount
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium flex justify-between">
                <div className="flex items-center gap-2">
                  <IconBell className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    การแจ้งเตือน {getTotalUnreadCount()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  ล้าง
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 bg-muted/60" />
              <div className="max-h-80 overflow-y-auto">
                {notifications.new.length > 0 &&
                  renderNotificationSection("ใหม่", notifications.new)}
                {notifications.new.length > 0 &&
                  notifications.earlier.length > 0 && (
                    <DropdownMenuSeparator className="my-1 bg-muted/60" />
                  )}
                {notifications.earlier.length > 0 &&
                  renderNotificationSection(
                    "ก่อนหน้านี้",
                    notifications.earlier
                  )}
              </div>
              <DropdownMenuSeparator className="my-1 bg-muted/60" />
              <DropdownMenuItem className="flex cursor-pointer items-center justify-center rounded-md px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent">
                ดูการแจ้งเตือนทั้งหมด
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:hidden md:flex">
            <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 hover:bg-accent/80 hover:shadow-sm active:scale-95">
              {isLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
                <Avatar className="h-8 w-8 overflow-hidden rounded-full border-2 border-primary/10 shadow-sm transition-transform duration-200 hover:scale-105 md:h-9 md:w-9">
                  <AvatarImage
                    src={profile?.data?.avatar}
                    alt={profile?.data?.firstName}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className={cn(
                      getBackgroundColor(profile?.data?.firstName?.charAt(0)),
                      "uppercase text-white font-semibold text-base tracking-wider animate-in fade-in-0 zoom-in-95 duration-200"
                    )}
                  >
                    {profile?.data?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="hidden text-left text-sm leading-tight transition-opacity duration-200 md:grid">
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32 mt-1" />
                  </>
                ) : (
                  <>
                    <span className="font-bold">
                      Hello, {profile?.data?.firstName}
                    </span>
                    <span className="text-xs text-muted-foreground/90">
                      {profile?.data?.email}
                    </span>
                  </>
                )}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 p-1"
            align="end"
            sideOffset={8}
            alignOffset={0}
            forceMount
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              บัญชีของฉัน
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-1 bg-muted/60" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/customer/profile-user")}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent focus:bg-accent"
              >
                <IconUserCircle className="size-4 text-muted-foreground" />
                <span>โปรไฟล์</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent focus:bg-accent">
                <IconUserCircle className="size-4 text-muted-foreground" />
                <span>การชำระเงิน</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent focus:bg-accent">
                <IconSettings className="size-4 text-muted-foreground" />
                <span>ตั้งค่า</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1 bg-muted/60" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <IconLogout className="size-4" />
              <span>ออกจากระบบ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HeaderCus;
