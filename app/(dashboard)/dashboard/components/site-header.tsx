import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  IconBell,
  IconCrown,
  IconDotsVertical,
  IconGift,
  IconHistory,
  IconLogout,
  IconNotification,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useProfile } from "@/hooks/use-profile";
import Link from "next/link";

export function SiteHeader() {
  const { data: profile } = useProfile();
  console.log("profile", profile);

  // Mock user data - replace with actual user data from your auth system

  return (
    <header className="flex h-(--header-height) p-6 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
                <IconBell className="size-5" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  2
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>การแจ้งเตือน</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-center gap-2">
                    <span className="font-medium">ใบแจ้งหนี้ใหม่</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      2 นาทีที่แล้ว
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    คุณมีใบแจ้งหนี้ใหม่ #INV-2024001
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-center gap-2">
                    <span className="font-medium">ชำระเงินสำเร็จ</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      1 ชั่วโมงที่แล้ว
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    การชำระเงินของคุณสำเร็จแล้ว #PAY-2024001
                  </span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
                <Avatar className="h-9 w-9 rounded-full border-2 border-primary/10">
                  <AvatarImage
                    src={profile?.data?.avatar}
                    alt={profile?.firstName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5">CN</AvatarFallback>
                </Avatar>
                <div className="hidden md:grid text-left text-sm leading-tight">
                  <span className="font-medium">
                    {profile?.data?.firstName}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {profile?.data?.email}
                  </span>
                </div>
                <IconDotsVertical className="size-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2" align="end">
              <div className="flex items-center gap-3 px-2 py-3">
                <Avatar className="h-12 w-12 rounded-full border-2 border-primary/10">
                  <AvatarImage
                    src={profile?.data?.avatar}
                    alt={profile?.data?.firstName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5 text-lg">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium leading-none">
                    {profile?.data?.firstName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {profile?.data?.email}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <IconCrown className="size-4 text-yellow-500" />
                    <span className="text-xs">{profile?.data?.level}</span>
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs font-normal"
                    >
                      {profile?.points} points
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="px-2 py-2">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">
                    ถึงระดับถัดไป: {profile?.nextLevel - profile?.points} points
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${
                          (profile?.points / profile?.nextLevel) * 100
                        }%`,
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
                <Link href="/settings" className="block">
                  <DropdownMenuItem className="gap-3 p-2.5 cursor-pointer">
                    <IconSettings className="size-5" />
                    <div className="grid gap-0.5">
                      <span className="font-medium">ตั้งค่า</span>
                      <span className="text-xs text-muted-foreground">
                        ปรับแต่งการใช้งาน
                      </span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => signOut()}
                className="gap-3 p-2.5 cursor-pointer text-red-500 focus:text-red-500"
              >
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
    </header>
  );
}
