"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/use-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  IconCrown,
  IconMapPin,
  IconCalendar,
  IconBuildingStore,
  IconCamera,
  IconPencil,
  IconReceipt,
  IconTrendingUp,
  IconUsers,
  IconStar,
  IconMedal,
  IconTrophy,
  IconPhoto,
  IconX,
  IconEdit,
  IconCheck,
  IconClock,
  IconHeart,
  IconMessage,
  IconShare3,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ProfileForm } from "./components/profile-form";
import { NotificationsForm } from "./components/notifications-form";
import { PaymentForm } from "./components/payment-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

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

const achievements = [
  {
    icon: IconMedal,
    label: "Top Seller",
    description: "ยอดขายสูงสุดประจำเดือน",
  },
  { icon: IconTrophy, label: "Early Adopter", description: "ผู้ใช้งานรุ่นแรก" },
  { icon: IconStar, label: "Rising Star", description: "การเติบโตรวดเร็ว" },
];

const ProfilePage = () => {
  const { data: profile } = useProfile();
  const [coverPhoto, setCoverPhoto] = React.useState<string | null>(
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070"
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [bio, setBio] = React.useState(
    "นักธุรกิจรุ่นใหม่ที่หลงใหลในการสร้างธุรกิจออนไลน์"
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverPhoto = () => {
    setCoverPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const stats = [
    { icon: IconHeart, label: "ผู้ติดตาม", value: "2.5K" },
    { icon: IconMessage, label: "รีวิว", value: "150" },
    { icon: IconClock, label: "อัตราการตอบกลับ", value: "98%" },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col space-y-8">
        <Card className="overflow-hidden py-0">
          <div className="relative">
            {/* Cover Photo */}
            <div className="relative h-80 overflow-hidden">
              {coverPhoto ? (
                <Image
                  src={coverPhoto}
                  alt="Cover"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20">
                  <IconPhoto className="size-12 text-muted-foreground/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {/* Cover Photo Controls */}
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-8 rounded-full opacity-90 hover:opacity-100 backdrop-blur-sm"
                    >
                      <IconCamera className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>อัพโหลดรูปปก</DialogTitle>
                      <DialogDescription>
                        เลือกรูปภาพที่ต้องการใช้เป็นรูปปกโปรไฟล์ของคุณ
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </DialogContent>
                </Dialog>

                {coverPhoto && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-8 rounded-full opacity-90 hover:opacity-100 backdrop-blur-sm"
                    onClick={removeCoverPhoto}
                  >
                    <IconX className="size-4" />
                  </Button>
                )}
              </div>

              {/* Share Button */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-4 gap-2 backdrop-blur-sm"
              >
                <IconShare3 className="size-4" />
                <span>แชร์โปรไฟล์</span>
              </Button>
            </div>

            {/* Profile Avatar */}
            <div className="absolute -bottom-16 left-8 space-y-1">
              <div className="relative group">
                <Avatar className="h-32 w-32 overflow-hidden rounded-full border-4 border-background shadow-xl transition-transform duration-300 group-hover:scale-105">
                  <AvatarImage
                    src={profile?.data?.avatar}
                    alt={profile?.data?.firstName}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className={cn(
                      getBackgroundColor(profile?.data?.firstName?.charAt(0)),
                      "uppercase text-white font-semibold text-4xl"
                    )}
                  >
                    {profile?.data?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 size-8 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      <IconPencil className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>อัพโหลดรูปโปรไฟล์</DialogTitle>
                      <DialogDescription>
                        เลือกรูปภาพที่ต้องการใช้เป็นรูปโปรไฟล์ของคุณ
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="p-8 pt-20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {profile?.data?.firstName || "ผู้ใช้งาน"}
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <Tooltip>
                        <TooltipTrigger>
                          <IconCrown className="size-5 text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Premium Member</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="text-sm font-medium">
                        {profile?.data?.level}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs font-bold bg-orange-500 text-white tracking-wider"
                      >
                        {profile?.points ? profile?.points : 200} points
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {profile?.data?.email}
                  </p>
                </div>

                {/* Bio */}
                <div className="max-w-2xl">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        <IconCheck className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="group relative">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {bio}
                        <IconTrendingUp className="size-4 text-blue-500" />
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setIsEditing(true)}
                      >
                        <IconEdit className="size-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <IconMapPin className="size-4" />
                    <span>กรุงเทพมหานคร, ประเทศไทย</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconBuildingStore className="size-4" />
                    <span>เจ้าของร้าน 2 ร้าน</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconCalendar className="size-4" />
                    <span>เข้าร่วมเมื่อ มกราคม 2024</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="size-5 mx-auto mb-1 text-primary" />
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {achievements.map((achievement, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <div className="rounded-lg border bg-card px-3 py-2 hover:bg-accent transition-colors">
                          <div className="flex items-center gap-2">
                            <achievement.icon className="size-4 text-primary" />
                            <span className="text-sm font-medium">
                              {achievement.label}
                            </span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{achievement.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-[280px] space-y-4">
                <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Level Progress</span>
                    <Badge variant="outline" className="font-mono">
                      {Math.round((profile?.points / profile?.nextLevel) * 100)}
                      %
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-secondary/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{
                          width: `${
                            (profile?.points / profile?.nextLevel) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{profile?.points} points</span>
                      <span>{profile?.nextLevel} points</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <IconReceipt className="size-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        บิลทั้งหมด
                      </span>
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <IconTrendingUp className="size-3" />
                      <span>+23.6%</span>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <IconUsers className="size-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        ลูกค้าประจำ
                      </span>
                    </div>
                    <div className="text-2xl font-bold">3,500฿</div>
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <IconTrendingUp className="size-3" />
                      <span>+12.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-0.5">
                <TabsTrigger value="profile" className="text-sm">
                  โปรไฟล์
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm">
                  การแจ้งเตือน
                </TabsTrigger>
                <TabsTrigger value="payment" className="text-sm">
                  การชำระเงิน
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-4">
                <ProfileForm />
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <NotificationsForm />
              </TabsContent>
              <TabsContent value="payment" className="space-y-4">
                <PaymentForm />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
