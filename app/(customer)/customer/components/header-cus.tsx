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
  IconDotsVertical,
  IconUserCircle,
  IconLogout,
  IconHome,
  IconFileInvoice,
  IconPackage,
} from "@tabler/icons-react";
import { useProfile } from "@/hooks/use-profile";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      {/* Left side - Website Name */}
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
        <span className="text-xl font-semibold">BillDee</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Right side - Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent">
            <Avatar className="h-9 w-9 rounded-full border-2 border-primary/10">
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
            <IconDotsVertical className="size-4 text-muted-foreground" />
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
          <DropdownMenuItem onClick={handleLogout}>
            <IconLogout className="mr-2 size-4" />
            <span>ออกจากระบบ</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default HeaderCus;
