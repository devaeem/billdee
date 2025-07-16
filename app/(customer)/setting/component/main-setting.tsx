"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/custom-ui/input";
import Select from "@/components/custom-ui/select";
import Btn from "@/components/custom-ui/btn";
import ImageUploadPreview from "../../components/ImageUploadPreview";
import { useRouter } from "next/navigation";

interface StoreSettingsForm {
  storeName: string;
  phoneNumber: string;
  bank: string;
  accountNumber: string;
  promptPay: string;
}

const MainSetting = () => {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StoreSettingsForm>();

  const bankOptions = [
    { value: "kbank", label: "ธนาคารกสิกรไทย" },
    { value: "scb", label: "ธนาคารไทยพาณิชย์" },
    { value: "bbl", label: "ธนาคารกรุงเทพ" },
    { value: "ktb", label: "ธนาคารกรุงไทย" },
    { value: "tmb", label: "ธนาคารทหารไทยธนชาต" },
    { value: "bay", label: "ธนาคารกรุงศรีอยุธยา" },
  ];

  const onSubmit = async (data: StoreSettingsForm) => {
    try {
      console.log("Form data:", data);
      console.log("Logo:", logoPreview);
      console.log("QR Code:", qrPreview);

      // TODO: Implement API call to save store settings
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <Card className="bg-white border-0 border-gray-200 rounded-4xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">ตั้งค่าข้อมูลร้าน</CardTitle>
        <CardDescription className="text-base">ข้อมูลร้าน</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Store Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="ชื่อร้าน"
              placeholder="กรอกชื่อร้าน"
              {...register("storeName", {
                required: "กรุณากรอกชื่อร้าน",
              })}
              error={errors.storeName?.message}
              required
            />

            <Input
              label="เบอร์โทร"
              placeholder="กรอกเบอร์โทรศัพท์"
              {...register("phoneNumber", {
                required: "กรุณากรอกเบอร์โทรศัพท์",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
                },
              })}
              error={errors.phoneNumber?.message}
              required
            />
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadPreview
              type="logo"
              preview={logoPreview}
              title="โลโก้ร้าน"
              subtitle="รูปสี่เหลี่ยม 200x200 px"
              onUploadSuccess={setLogoPreview}
              onRemove={() => setLogoPreview(null)}
            />

            <ImageUploadPreview
              type="qr"
              preview={qrPreview}
              title="QR Code พร้อมเพย์"
              subtitle="สำหรับให้ลูกค้าสแกนชำระ"
              onUploadSuccess={setQrPreview}
              onRemove={() => setQrPreview(null)}
            />
          </div>

          {/* Bank Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              ข้อมูลบัญชีธนาคาร
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="ธนาคาร"
                placeholder="เลือกธนาคาร"
                options={bankOptions}
                value={watch("bank")}
                onValueChange={(value) => setValue("bank", value)}
                error={errors.bank?.message}
                required
              />

              <Input
                label="เลขบัญชี"
                placeholder="กรอกเลขบัญชีธนาคาร"
                {...register("accountNumber", {
                  required: "กรุณากรอกเลขบัญชี",
                  pattern: {
                    value: /^[0-9-]{10,15}$/,
                    message: "เลขบัญชีไม่ถูกต้อง",
                  },
                })}
                error={errors.accountNumber?.message}
                required
              />

              <Input
                label="พร้อมเพย์"
                placeholder="กรอกเลขพร้อมเพย์"
                {...register("promptPay", {
                  required: "กรุณากรอกเลขพร้อมเพย์",
                  pattern: {
                    value: /^[0-9]{10,13}$/,
                    message: "เลขพร้อมเพย์ไม่ถูกต้อง",
                  },
                })}
                error={errors.promptPay?.message}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start gap-2 pt-1">
            <Btn onClick={() => router.back()} type="button" variant="outline">
              ยกเลิก
            </Btn>
            <Btn type="submit" variant="default" isLoading={isSubmitting}>
              บันทึก
            </Btn>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainSetting;
