"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./components/appearance-form";
import { ProfileForm } from "./components/profile-form";
import { NotificationsForm } from "./components/notifications-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">การตั้งค่า</h2>
        <p className="text-muted-foreground">
          จัดการการตั้งค่าบัญชีและการกำหนดค่าเว็บไซต์ของคุณ
        </p>
      </div>
      <Separator />
      <Tabs defaultValue="appearance" className="">
        <TabsList>
          <TabsTrigger value="profile">โปรไฟล์</TabsTrigger>
          <TabsTrigger value="appearance">การแสดงผล</TabsTrigger>
          <TabsTrigger value="notifications">การแจ้งเตือน</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <AppearanceForm />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
