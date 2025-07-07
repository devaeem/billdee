"use client";

import React from "react";
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
import Input from "@/components/custom-ui/input";
import ImageUploadPreview from "../../components/ImageUploadPreview";
import Btn from "@/components/custom-ui/btn";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/custom-ui/textarea";

// Define form validation schema
const formSchema = z.object({
  storeName: z.string().min(1, "กรุณากรอกชื่อร้าน"),
  storeNumber: z.string().min(1, "กรุณากรอกหมายเลขร้าน"),
  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง ต้องเป็นตัวเลข 10 หลัก"),
  email: z.string().email("อีเมลไม่ถูกต้อง").min(1, "กรุณากรอกอีเมล"),
  address: z.string().min(1, "กรุณากรอกที่อยู่"),
  taxId: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  qrCodeUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateShop = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      storeNumber: "",
      phone: "",
      email: "",
      address: "",
      taxId: "",
      description: "",
      logoUrl: "",
      qrCodeUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: Implement shop creation logic here
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Error creating shop:", error);
    }
  };

  const handleImageUpload = (type: "logo" | "qr", imageUrl: string) => {
    setValue(type === "logo" ? "logoUrl" : "qrCodeUrl", imageUrl);
  };

  const handleImageRemove = (type: "logo" | "qr") => {
    setValue(type === "logo" ? "logoUrl" : "qrCodeUrl", "");
  };

  const logoUrl = watch("logoUrl") || null;
  const qrCodeUrl = watch("qrCodeUrl") || null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>เพิ่มร้านค้าใหม่</CardTitle>
          <CardDescription>กรอกข้อมูลร้านค้าของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="ชื่อร้าน"
                placeholder="กรอกชื่อร้าน"
                {...register("storeName")}
                error={errors.storeName?.message}
              />
            </div>
            <div>
              <Input
                label="หมายเลขร้าน"
                placeholder="กรอกหมายเลขร้าน"
                {...register("storeNumber")}
                error={errors.storeNumber?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="เบอร์โทร"
                placeholder="กรอกเบอร์โทรศัพท์"
                type="tel"
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>
            <div>
              <Input
                label="อีเมล"
                placeholder="กรอกอีเมล"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Input
                label="ประเภทร้าน"
                placeholder="กรอกประเภทร้าน"
                {...register("taxId")}
                error={errors.taxId?.message}
              />
            </div>
            <div>
              <Input
                label="เลขประจำตัวผู้เสียภาษี"
                placeholder="กรอกเลขประจำตัวผู้เสียภาษี (ถ้ามี)"
                {...register("taxId")}
                error={errors.taxId?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Textarea
                label="รายละเอียดร้าน"
                placeholder="รายละเอียดร้าน (ถ้ามี)"
                className="resize-none"
                {...register("description")}
              />
            </div>
            <div>
              <Textarea
                label="ที่อยู่ร้าน"
                placeholder="กรอกที่อยู่ร้าน"
                className="resize-none"
                {...register("address")}
              />
              {errors.address?.message && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadPreview
              type="logo"
              preview={logoUrl}
              title="โลโก้ร้าน"
              subtitle="รูปแนะนำ 200x200 px (PNG, JPG)"
              onUploadSuccess={(url: string) => handleImageUpload("logo", url)}
              onRemove={() => handleImageRemove("logo")}
            />
            <ImageUploadPreview
              type="qr"
              preview={qrCodeUrl}
              title="QR Code พร้อมเพย์"
              subtitle="สำหรับใช้ทำแสกนจ่าย"
              onUploadSuccess={(url: string) => handleImageUpload("qr", url)}
              onRemove={() => handleImageRemove("qr")}
            />
          </div>
          <div className="flex justify-self-start gap-2">
            <Btn type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? "กำลังสร้าง..." : "สร้างร้านค้า"}
            </Btn>
            <Btn
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              ยกเลิก
            </Btn>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateShop;
