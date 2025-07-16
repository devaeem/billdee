"use client";

import React from "react";
import { useProfile } from "@/hooks/use-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/custom-ui/input";
import Select from "@/components/custom-ui/select";
import { Textarea } from "@/components/custom-ui/textarea";
import Btn from "@/components/custom-ui/btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axios";
import {
  User02Icon,
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  CameraAddIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// Profile form schema
const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร" })
    .max(50, { message: "ชื่อต้องมีความยาวไม่เกิน 50 ตัวอักษร" }),
  lastName: z
    .string()
    .min(2, { message: "นามสกุลต้องมีความยาวอย่างน้อย 2 ตัวอักษร" })
    .max(50, { message: "นามสกุลต้องมีความยาวไม่เกิน 50 ตัวอักษร" }),
  email: z
    .string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z
    .string()
    .min(10, { message: "เบอร์โทรศัพท์ต้องมีความยาว 10 หลัก" })
    .max(10, { message: "เบอร์โทรศัพท์ต้องมีความยาว 10 หลัก" })
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Page = () => {
  const { data: profile, isLoading, mutate } = useProfile();
  const user = profile?.data;
  const account = user?.accounts?.[0];

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: account?.phone || "",
      address: account?.address || "",
      city: account?.city || "",
      state: account?.state || "",
      zip: account?.zip || "",
      country: account?.country || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Update user basic info
      await axiosInstance.put(`/users/${user?.id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      // Update account info if account exists
      if (account?.id) {
        await axiosInstance.put(`/accounts/${account.id}`, {
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        });
      }

      // Refresh profile data
      await mutate();

      toast.success("บันทึกสำเร็จ", {
        description: "ของคุณได้รับการอัปเดตเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("เกิดข้อผิดพลาด", {
        description: "ไม่สามารถบันทึกได้ กรุณาลองใหม่อีกครั้ง",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-pulse text-gray-500">
              กำลังโหลดข้อมูล...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-500">ไม่พบข้อมูลผู้ใช้</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight"></h1>
        <p className="text-gray-600">
          จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ
        </p>
      </div>

      <Separator />

      {/* Edit Profile Form */}
      <Card className="bg-white border-0 border-gray-200 rounded-4xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={User02Icon} className="w-5 h-5" />
            แก้ไข
          </CardTitle>
          <CardDescription>
            อัปเดตข้อมูลส่วนตัวและข้อมูลติดต่อของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={User02Icon} className="w-5 h-5" />
                  ข้อมูลส่วนตัว
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อจริง</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อจริง" {...field} />
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
                          <Input placeholder="นามสกุล" {...field} />
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
                      <FormLabel className="flex items-center gap-2">
                        <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4" />
                        อีเมล
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="อีเมล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <HugeiconsIcon icon={Call02Icon} className="w-4 h-4" />
                        เบอร์โทรศัพท์
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="เบอร์โทรศัพท์" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Address Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={Location01Icon} className="w-5 h-5" />
                  ข้อมูลที่อยู่
                </h3>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รายละเอียดที่อยู่</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="รายละเอียดที่อยู่ เช่น บ้านเลขที่ ชื่อถนน"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เมือง/อำเภอ</FormLabel>
                        <FormControl>
                          <Input placeholder="เมือง/อำเภอ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>จังหวัด</FormLabel>
                        <FormControl>
                          <Input placeholder="จังหวัด" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รหัสไปรษณีย์</FormLabel>
                        <FormControl>
                          <Input placeholder="รหัสไปรษณีย์" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ประเทศ</FormLabel>
                        <FormControl>
                          <Input placeholder="ประเทศ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Btn
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  ยกเลิก
                </Btn>
                <Btn type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "กำลังบันทึก..."
                    : "บันทึกข้อมูล"}
                </Btn>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
