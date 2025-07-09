"use client";

import React, { useState, useEffect } from "react";
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
import Select from "@/components/custom-ui/select";
import ImageUploadPreview from "../../components/ImageUploadPreview";
import Btn from "@/components/custom-ui/btn";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/custom-ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, ShopSignIcon } from "@hugeicons/core-free-icons";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  province: z.string().min(1, "กรุณาเลือกจังหวัด"),
  district: z.string().min(1, "กรุณาเลือกอำเภอ"),
  subdistrict: z.string().min(1, "กรุณาเลือกตำบล"),
  zipcode: z
    .string()
    .min(5, "รหัสไปรษณีย์ไม่ถูกต้อง")
    .max(5, "รหัสไปรษณีย์ไม่ถูกต้อง"),
  storeType: z.enum(["wholesale", "retail"], {
    required_error: "กรุณาเลือกประเภทร้าน",
  }),
  taxId: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  qrCodeUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for provinces and districts
const provinces = [
  { value: "bangkok", label: "กรุงเทพมหานคร" },
  { value: "nonthaburi", label: "นนทบุรี" },
  { value: "pathumthani", label: "ปทุมธานี" },
  // Add more provinces as needed
];

const districtsByProvince = {
  bangkok: [
    { value: "bangrak", label: "บางรัก" },
    { value: "pathumwan", label: "ปทุมวัน" },
    { value: "sathorn", label: "สาทร" },
  ],
  nonthaburi: [
    { value: "muang_nonthaburi", label: "เมืองนนทบุรี" },
    { value: "bangkruai", label: "บางกรวย" },
    { value: "bangyai", label: "บางใหญ่" },
  ],
  pathumthani: [
    { value: "muang_pathum", label: "เมืองปทุมธานี" },
    { value: "thanyaburi", label: "ธัญบุรี" },
    { value: "klong_luang", label: "คลองหลวง" },
  ],
};

const subdistrictsByDistrict = {
  bangrak: [
    { value: "silom", label: "สีลม", zipcode: "10500" },
    { value: "suriyawong", label: "สุริยวงศ์", zipcode: "10500" },
    { value: "mahapruetharam", label: "มหาพฤฒาราม", zipcode: "10500" },
  ],
  pathumwan: [
    { value: "lumphini", label: "ลุมพินี", zipcode: "10330" },
    { value: "pathumwan", label: "ปทุมวัน", zipcode: "10330" },
    { value: "wangmai", label: "วังใหม่", zipcode: "10330" },
  ],
  // Add more subdistricts for other districts...
};

const CreateShop = () => {
  const [districts, setDistricts] = useState<
    { value: string; label: string }[]
  >([]);
  const [subdistricts, setSubdistricts] = useState<
    { value: string; label: string; zipcode: string }[]
  >([]);
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
      province: "",
      district: "",
      subdistrict: "",
      zipcode: "",
      storeType: undefined,
      taxId: "",
      description: "",
      logoUrl: "",
      qrCodeUrl: "",
    },
  });

  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

  useEffect(() => {
    if (selectedProvince) {
      setDistricts(
        districtsByProvince[
          selectedProvince as keyof typeof districtsByProvince
        ] || []
      );
      setValue("district", "");
      setValue("subdistrict", "");
      setValue("zipcode", "");
    }
  }, [selectedProvince, setValue]);

  useEffect(() => {
    if (selectedDistrict) {
      setSubdistricts(
        subdistrictsByDistrict[
          selectedDistrict as keyof typeof subdistrictsByDistrict
        ] || []
      );
      setValue("subdistrict", "");
      setValue("zipcode", "");
    }
  }, [selectedDistrict, setValue]);

  // Update zipcode when subdistrict is selected
  const handleSubdistrictChange = (value: string) => {
    setValue("subdistrict", value);
    const selectedSubdistrict = subdistricts.find((sub) => sub.value === value);
    if (selectedSubdistrict) {
      setValue("zipcode", selectedSubdistrict.zipcode);
    }
  };

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
      <Card className="shadow-md ">
        <CardHeader>
          <CardTitle>เพิ่มร้านค้าใหม่</CardTitle>
          <CardDescription>กรอกข้อมูลร้านค้าของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:gap-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
            <div>
              <Input
                label="ชื่อร้าน"
                placeholder="กรอกชื่อร้าน"
                {...register("storeName")}
                error={errors.storeName?.message}
                startIcon={<HugeiconsIcon icon={ShopSignIcon} size={16} />}
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
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                ประเภทร้าน
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    watch("storeType") === "wholesale"
                      ? "border-orange-500 bg-orange-50"
                      : "border-border hover:border-orange-300"
                  }`}
                  onClick={() => setValue("storeType", "wholesale")}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-2">
                      <HugeiconsIcon
                        icon={ShopSignIcon}
                        size={24}
                        className="text-orange-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">ค้าส่ง</h3>
                      <p className="text-sm text-muted-foreground">
                        สำหรับธุรกิจค้าส่งสินค้า
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    watch("storeType") === "retail"
                      ? "border-orange-500 bg-orange-50"
                      : "border-border hover:border-orange-300"
                  }`}
                  onClick={() => setValue("storeType", "retail")}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-2">
                      <HugeiconsIcon
                        icon={ShopSignIcon}
                        size={24}
                        className="text-orange-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">ค้าปลีก</h3>
                      <p className="text-sm text-muted-foreground">
                        สำหรับธุรกิจค้าปลีกสินค้า
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {errors.storeType && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.storeType.message}
                </p>
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <Textarea
                label="รายละเอียดร้าน"
                placeholder="รายละเอียดร้าน (ถ้ามี)"
                className="resize-none"
                {...register("description")}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
            <div>
              <Select
                label="จังหวัด"
                placeholder="เลือกจังหวัด"
                options={provinces}
                value={watch("province")}
                onValueChange={(value: string) => setValue("province", value)}
                error={errors.province?.message}
              />
            </div>
            <div>
              <Select
                label="อำเภอ"
                placeholder="เลือกอำเภอ"
                options={districts}
                value={watch("district")}
                onValueChange={(value: string) => setValue("district", value)}
                error={errors.district?.message}
                disabled={!selectedProvince}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="ตำบล"
                placeholder="เลือกตำบล"
                options={subdistricts}
                value={watch("subdistrict")}
                onValueChange={handleSubdistrictChange}
                error={errors.subdistrict?.message}
                disabled={!selectedDistrict}
              />
            </div>
            <div>
              <Input
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
                value={watch("zipcode")}
                {...register("zipcode")}
                error={errors.zipcode?.message}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
          {/* alert */}
          <div>
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} size={16} />
              <AlertDescription>
                <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <ul className="list-inside list-disc text-sm">
                  <li>หากต้องการสร้างร้านค้าใหม่ กรุณาติดต่อผู้ดูแลระบบ</li>
                  <li>หากต้องการลบร้านค้า กรุณาติดต่อผู้ดูแลระบบ</li>
                </ul>
              </AlertDescription>
            </Alert>
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
