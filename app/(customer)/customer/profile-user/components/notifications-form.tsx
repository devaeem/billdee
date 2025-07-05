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
} from "@/components/ui/form";
import { toast } from "sonner";

const notificationsFormSchema = z.object({
  communication_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
  push_notifications: z.boolean().default(false).optional(),
  sms_notifications: z.boolean().default(false).optional(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// This can come from your database or API
const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: true,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
  push_notifications: true,
  sms_notifications: false,
};

export function NotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  async function onSubmit(data: NotificationsFormValues) {
    try {
      // TODO: Implement API call to update notification settings
      console.log(data);
      toast.success("บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว");
    } catch (error) {
      toast.error(`เกิดข้อผิดพลาดในการบันทึกข้อมูล ${error}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
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
          <FormField
            control={form.control}
            name="push_notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>การแจ้งเตือนแบบพุช</FormLabel>
                  <FormDescription>
                    รับการแจ้งเตือนแบบพุชบนเบราว์เซอร์ของคุณ
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sms_notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>การแจ้งเตือนทาง SMS</FormLabel>
                  <FormDescription>
                    รับการแจ้งเตือนผ่าน SMS บนโทรศัพท์มือถือของคุณ
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">บันทึกการตั้งค่า</Button>
      </form>
    </Form>
  );
}
