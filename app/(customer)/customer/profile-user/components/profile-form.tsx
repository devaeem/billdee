"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useProfile } from "@/hooks/use-profile";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร",
    })
    .max(30, {
      message: "ชื่อต้องมีความยาวไม่เกิน 30 ตัวอักษร",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "นามสกุลต้องมีความยาวอย่างน้อย 2 ตัวอักษร",
    })
    .max(30, {
      message: "นามสกุลต้องมีความยาวไม่เกิน 30 ตัวอักษร",
    }),
  email: z
    .string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
  phoneNumber: z
    .string()
    .min(10, { message: "เบอร์โทรศัพท์ต้องมี 10 หลัก" })
    .max(10, { message: "เบอร์โทรศัพท์ต้องมี 10 หลัก" }),
  bio: z.string().max(160, {
    message: "ประวัติย่อต้องมีความยาวไม่เกิน 160 ตัวอักษร",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { data: profile, mutate } = useProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: profile?.data?.firstName || "",
      lastName: profile?.data?.lastName || "",
      email: profile?.data?.email || "",
      phoneNumber: profile?.data?.phoneNumber || "",
      bio: profile?.data?.bio || "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      // TODO: Implement API call to update profile
      console.log(data);
      toast.success("บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว");
      await mutate(); // Refresh profile data
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อ</FormLabel>
                <FormControl>
                  <Input placeholder="กรอกชื่อ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>นามสกุล</FormLabel>
                <FormControl>
                  <Input placeholder="กรอกนามสกุล" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input placeholder="กรอกอีเมล" {...field} />
              </FormControl>
              <FormDescription>
                อีเมลที่ใช้ในการเข้าสู่ระบบและรับการแจ้งเตือน
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทรศัพท์</FormLabel>
              <FormControl>
                <Input placeholder="กรอกเบอร์โทรศัพท์" {...field} />
              </FormControl>
              <FormDescription>
                เบอร์โทรศัพท์สำหรับติดต่อและรับการแจ้งเตือน
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ประวัติย่อ</FormLabel>
              <FormControl>
                <Input placeholder="เขียนประวัติย่อของคุณ" {...field} />
              </FormControl>
              <FormDescription>
                เขียนประวัติย่อสั้นๆ เกี่ยวกับตัวคุณ จะแสดงในหน้าโปรไฟล์ของคุณ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">บันทึกข้อมูล</Button>
      </form>
    </Form>
  );
}
