"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const notificationsFormSchema = z.object({
  communication_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// This can come from your database or API
const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: true,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
};

export function NotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    toast.success("บันทึกการตั้งค่าเรียบร้อยแล้ว");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="communication_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>การสื่อสาร</FormLabel>
                <FormDescription>
                  รับอีเมลเกี่ยวกับกิจกรรมของคุณ
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marketing_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>การตลาด</FormLabel>
                <FormDescription>
                  รับอีเมลเกี่ยวกับผลิตภัณฑ์ใหม่ ส่วนลด และอัพเดทต่างๆ
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>โซเชียล</FormLabel>
                <FormDescription>
                  รับอีเมลเกี่ยวกับการติดตาม การแสดงความคิดเห็น และการตอบกลับ
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="security_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>ความปลอดภัย</FormLabel>
                <FormDescription>
                  รับอีเมลเกี่ยวกับกิจกรรมและความปลอดภัยของบัญชีของคุณ
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">บันทึกการตั้งค่า</Button>
      </form>
    </Form>
  );
}
