"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceTable, PaymentTable } from "./components/main-cis";
import { ProductForm } from "./components/product-form";
import { BillForm } from "./components/bill-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  User,
  Settings,
  LogOut,
  Camera,
  Edit,
  Bell,
  CreditCard,
  Receipt,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Star,
  Trophy,
  Crown,
  Gem,
} from "lucide-react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
  IconSettings,
  IconCrown,
  IconGift,
  IconHistory,
  IconBell,
  IconCheck,
  IconExclamationCircle,
  IconX,
} from "@tabler/icons-react";

export default function CustomerDashboard() {
  const user = {
    name: "devaeem",
    email: "customer@example.com",
    avatar: "/images/avatar.png",
    level: "ลูกค้าทั่วไป",
    points: 1234,
    nextLevel: 5000,
  };

  const notifications = [
    {
      id: 1,
      title: "ใบแจ้งหนี้ใหม่",
      description: "คุณมีใบแจ้งหนี้ใหม่ #INV-2024001",
      time: "2 นาทีที่แล้ว",
      status: "unread",
      type: "invoice",
    },
    {
      id: 2,
      title: "ชำระเงินสำเร็จ",
      description: "การชำระเงินของคุณสำเร็จแล้ว #PAY-2024001",
      time: "1 ชั่วโมงที่แล้ว",
      status: "read",
      type: "success",
    },
    {
      id: 3,
      title: "แจ้งเตือนการชำระเงิน",
      description: "ใบแจ้งหนี้ #INV-2023099 จะครบกำหนดในอีก 2 วัน",
      time: "2 ชั่วโมงที่แล้ว",
      status: "unread",
      type: "warning",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 bg-amber-100">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            ยินดีต้อนรับ, {user.name}
          </h1>
          <p className="text-muted-foreground">จัดการบิลและการชำระเงินของคุณ</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
                <IconBell className="size-5" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  2
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2" align="end">
              <div className="flex items-center justify-between px-2 py-2">
                <h3 className="font-semibold">การแจ้งเตือน</h3>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  ทำเครื่องหมายว่าอ่านแล้ว
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group flex gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors ${
                      notification.status === "unread" ? "bg-accent/50" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {notification.type === "invoice" && (
                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <IconBell className="size-4 text-blue-600" />
                        </div>
                      )}
                      {notification.type === "success" && (
                        <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                          <IconCheck className="size-4 text-green-600" />
                        </div>
                      )}
                      {notification.type === "warning" && (
                        <div className="size-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <IconExclamationCircle className="size-4 text-yellow-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 grid gap-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {notification.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconX className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-8"
              >
                ดูการแจ้งเตือนทั้งหมด
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
                <Avatar className="h-9 w-9 rounded-full border-2 border-primary/10">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5">CN</AvatarFallback>
                </Avatar>
                <div className="hidden md:grid text-left text-sm leading-tight">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {user.email}
                  </span>
                </div>
                <IconDotsVertical className="size-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2" align="end">
              <div className="flex items-center gap-3 px-2 py-3">
                <Avatar className="h-12 w-12 rounded-full border-2 border-primary/10">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5 text-lg">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium leading-none">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <IconCrown className="size-4 text-yellow-500" />
                    <span className="text-xs">{user.level}</span>
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs font-normal"
                    >
                      {user.points} points
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="px-2 py-2">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">
                    ถึงระดับถัดไป: {user.nextLevel - user.points} points
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${(user.points / user.nextLevel) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer">
                  <IconUserCircle className="size-5" />
                  <div className="grid gap-0.5">
                    <span className="font-medium">โปรไฟล์ของฉัน</span>
                    <span className="text-xs text-muted-foreground">
                      จัดการข้อมูลส่วนตัว
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer">
                  <IconGift className="size-5" />
                  <div className="grid gap-0.5">
                    <span className="font-medium">สิทธิประโยชน์</span>
                    <span className="text-xs text-muted-foreground">
                      ดูสิทธิพิเศษของคุณ
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer">
                  <IconHistory className="size-5" />
                  <div className="grid gap-0.5">
                    <span className="font-medium">ประวัติการใช้งาน</span>
                    <span className="text-xs text-muted-foreground">
                      ดูกิจกรรมทั้งหมด
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer">
                  <IconNotification className="size-5" />
                  <div className="grid gap-0.5">
                    <span className="font-medium">การแจ้งเตือน</span>
                    <span className="text-xs text-muted-foreground">
                      จัดการการแจ้งเตือน
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer">
                  <IconSettings className="size-5" />
                  <div className="grid gap-0.5">
                    <span className="font-medium">ตั้งค่า</span>
                    <span className="text-xs text-muted-foreground">
                      ปรับแต่งการใช้งาน
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer text-red-500 focus:text-red-500">
                <IconLogout className="size-5" />
                <div className="grid gap-0.5">
                  <span className="font-medium">ออกจากระบบ</span>
                  <span className="text-xs text-red-500/70">
                    ออกจากระบบทันที
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b">
            <div className="px-4">
              <TabsList className="h-12 w-full justify-start gap-6 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  ภาพรวม
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  ใบแจ้งหนี้
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  การชำระเงิน
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  สินค้า
                </TabsTrigger>
                <TabsTrigger
                  value="create-bill"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  สร้างบิล
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  โปรไฟล์
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="p-6">
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-red-500/10 to-red-500/5">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8">
                    <div className="absolute inset-0 rotate-12 transform opacity-20">
                      <AlertCircle className="h-24 w-24 text-red-500" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium text-base">
                        ใบแจ้งหนี้ที่ต้องชำระ
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline">
                      <p className="text-3xl font-bold text-red-500">
                        ฿3,500.00
                      </p>
                      <span className="ml-2 text-sm text-muted-foreground">
                        บาท
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-red-400">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>ครบกำหนด: 15 มี.ค. 2567</span>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full group hover:border-red-500/30 hover:bg-red-500/5"
                    >
                      ดูรายละเอียด
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>

                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-green-500/10 to-green-500/5">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8">
                    <div className="absolute inset-0 rotate-12 transform opacity-20">
                      <CheckCircle2 className="h-24 w-24 text-green-500" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2">
                      <Receipt className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-base">
                        ยอดชำระแล้ว (เดือนนี้)
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline">
                      <p className="text-3xl font-bold text-green-500">
                        ฿12,000.00
                      </p>
                      <span className="ml-2 text-sm text-muted-foreground">
                        บาท
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-400">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      <span>เพิ่มขึ้น 15% จากเดือนที่แล้ว</span>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full group hover:border-green-500/30 hover:bg-green-500/5"
                    >
                      ดูประวัติ
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>

                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8">
                    <div className="absolute inset-0 rotate-12 transform opacity-20">
                      <FileText className="h-24 w-24 text-blue-500" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium text-base">เอกสารล่าสุด</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-center justify-between rounded-lg bg-blue-500/5 p-2 transition-colors hover:bg-blue-500/10">
                        <div className="flex items-center space-x-2">
                          <Receipt className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            ใบแจ้งหนี้ #INV-2024001
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-blue-500/30 text-xs"
                        >
                          ใหม่
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between rounded-lg bg-green-500/5 p-2 transition-colors hover:bg-green-500/10">
                        <div className="flex items-center space-x-2">
                          <Receipt className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            ใบเสร็จรับเงิน #REC-2024001
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-green-500/30 text-xs"
                        >
                          ชำระแล้ว
                        </Badge>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="mt-4 w-full group hover:border-blue-500/30 hover:bg-blue-500/5"
                    >
                      ดูทั้งหมด
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  ประวัติใบแจ้งหนี้
                </h2>
                <InvoiceTable />
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  ประวัติการชำระเงิน
                </h2>
                <PaymentTable />
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <ProductForm />
            </TabsContent>

            <TabsContent value="create-bill">
              <BillForm />
            </TabsContent>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 col-span-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative group">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="relative cursor-pointer group">
                            <Avatar className="size-32 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-200">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="Profile Picture"
                                className="object-cover"
                              />
                              <AvatarFallback className="text-lg">
                                CN
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <Camera className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="center">
                          <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium leading-none">
                                คุณลูกค้า ทดสอบระบบ
                              </p>
                              <p className="text-xs leading-none text-muted-foreground">
                                customer@example.com
                              </p>
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>โปรไฟล์ของฉัน</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>การแจ้งเตือน</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>ตั้งค่า</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>ออกจากระบบ</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">
                      คุณลูกค้า ทดสอบระบบ
                    </h2>
                    <p className="text-gray-500 mt-1">customer@example.com</p>
                    <Badge variant="outline" className="mt-2">
                      ลูกค้าทั่วไป
                    </Badge>
                    <div className="grid grid-cols-2 gap-2 w-full mt-6">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        แก้ไขโปรไฟล์
                      </Button>
                      <Button size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        อัพโหลดรูป
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 col-span-1 lg:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        ข้อมูลส่วนตัว
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            ชื่อ-นามสกุล
                          </label>
                          <p className="text-base font-medium">
                            คุณลูกค้า ทดสอบระบบ
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            อีเมล
                          </label>
                          <p className="text-base font-medium">
                            customer@example.com
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            เบอร์โทรศัพท์
                          </label>
                          <p className="text-base font-medium">080-000-0000</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            วันที่สมัครสมาชิก
                          </label>
                          <p className="text-base font-medium">1 มกราคม 2567</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        ข้อมูลที่อยู่
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            ที่อยู่
                          </label>
                          <p className="text-base font-medium">
                            123/45 ถนนตัวอย่าง
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            แขวง/ตำบล
                          </label>
                          <p className="text-base font-medium">ตัวอย่าง</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            เขต/อำเภอ
                          </label>
                          <p className="text-base font-medium">ตัวอย่าง</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            จังหวัด
                          </label>
                          <p className="text-base font-medium">กรุงเทพมหานคร</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            รหัสไปรษณีย์
                          </label>
                          <p className="text-base font-medium">10000</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">ยกเลิก</Button>
                      <Button>แก้ไขข้อมูล</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
