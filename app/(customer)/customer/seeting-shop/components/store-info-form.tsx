"use client";
import React from "react";
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

export default function StoreInfoForm() {
  // const [logoPreview, setLogoPreview] = useState<string | null>(null);
  // const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>ข้อมูลร้าน</CardTitle>
        <CardDescription>รายละเอียดข้อมูลร้านค้า</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="ชื่อร้าน" placeholder="กรอกชื่อร้าน" />
          <Input label="เบอร์โทร" placeholder="กรอกเบอร์โทรศัพท์" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploadPreview
            type="logo"
            preview={null}
            title="โลโก้ร้าน"
            subtitle="รูปแนะนำ 200x200 px (PNG, JPG)"
          />
          <ImageUploadPreview
            type="qr"
            preview={null}
            title="QR Code พร้อมเพย์"
            subtitle="สำหรับใช้ทำแสกนจ่าย"
          />
        </div>
        <div className="flex justify-self-start gap-2">
          <Btn type="submit">บันทึก</Btn>
          <Btn type="submit" variant="outline">
            ยกเลิก
          </Btn>
        </div>
      </CardContent>
    </Card>
    // <div className="space-y-4">
    //   <h2 className="text-xl font-semibold">ข้อมูลร้าน</h2>

    //   <div className="grid gap-6">
    //     <div className="grid gap-4">
    //       <div className="space-y-2">
    //         <Label htmlFor="storeName">ชื่อร้าน</Label>
    //         <Input id="storeName" placeholder="กรอกชื่อร้าน" />
    //       </div>

    //       <div className="space-y-2">
    //         <Label htmlFor="phone">เบอร์โทร</Label>
    //         <Input id="phone" placeholder="กรอกเบอร์โทรศัพท์" type="tel" />
    //       </div>
    //     </div>

    //     <ImageUploadPreview
    //       type="logo"
    //       preview={logoPreview}
    //       title="โลโก้ร้าน"
    //       subtitle="รูปแนะนำ 200x200 px (PNG, JPG)"
    //     />

    //     <ImageUploadPreview
    //       type="qr"
    //       preview={qrCodePreview}
    //       title="QR Code พร้อมเพย์"
    //       subtitle="สำหรับใช้ทำแสกนจ่าย"
    //     />
    //   </div>

    //   <Button className="w-full">บันทึก</Button>

    //   <Dialog open={isUploading} onOpenChange={() => {}}>
    //     <DialogContent className="sm:max-w-[425px]">
    //       <DialogHeader>
    //         <DialogTitle>กำลังอัพโหลดรูปภาพ</DialogTitle>
    //         <DialogDescription>
    //           กรุณารอสักครู่ กำลังอัพโหลด
    //           {uploadType === "logo" ? "โลโก้" : "QR Code"}...
    //         </DialogDescription>
    //       </DialogHeader>
    //       <div className="flex justify-center py-6">
    //         <Loader2 className="h-8 w-8 animate-spin text-primary" />
    //       </div>
    //     </DialogContent>
    //   </Dialog>
    // </div>
  );
}
