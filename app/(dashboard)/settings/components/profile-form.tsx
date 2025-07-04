"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  username: z
    .string()
    .min(2, {
      message: "ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 2 ตัวอักษร",
    })
    .max(30, {
      message: "ชื่อผู้ใช้ต้องมีความยาวไม่เกิน 30 ตัวอักษร",
    }),
  email: z
    .string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
  bio: z.string().max(160, {
    message: "ประวัติย่อต้องมีความยาวไม่เกิน 160 ตัวอักษร",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API
const defaultValues: Partial<ProfileFormValues> = {
  username: "devaeem",
  email: "customer@example.com",
  bio: "ผู้พัฒนาระบบ",
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data, "data");
    toast.success("บันทึกการตั้งค่าเรียบร้อยแล้ว");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อผู้ใช้</FormLabel>
              <FormControl>
                <Input placeholder="ชื่อผู้ใช้" {...field} />
              </FormControl>
              <FormDescription>
                นี่คือชื่อผู้ใช้สาธารณะของคุณ คุณสามารถเปลี่ยนแปลงได้ตลอดเวลา
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input placeholder="อีเมล" {...field} />
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ประวัติย่อ</FormLabel>
              <FormControl>
                <Input placeholder="ประวัติย่อของคุณ" {...field} />
              </FormControl>
              <FormDescription>
                เขียนประวัติย่อสั้นๆ เกี่ยวกับตัวคุณ จะแสดงในหน้าโปรไฟล์ของคุณ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">บันทึกการตั้งค่า</Button>
      </form>
    </Form>
  );
}
