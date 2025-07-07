"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Btn from "@/components/custom-ui/btn";
import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "@/components/custom-ui/input";
import { Textarea } from "@/components/custom-ui/textarea";
import { mutate } from "swr";
import axiosInstance from "@/app/utils/axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateUser() {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  console.log(methods.formState.errors);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axiosInstance.post(`/users`, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      });
      console.log("Creating user:", data);
      mutate(`users?page=1&limit=10&search=`);
      router.push(`/member/${res.data.data.id}`);
      toast.success("สร้างบัญชีสมาชิกสำเร็จ", {
        description: "เรากำลังส่งอีเมลยืนยันการสมัครใช้งานให้คุณ",
      });
    } catch (error) {
      console.log("Error", error);
      toast.error("สร้างบัญชีสมาชิกไม่สำเร็จ", {
        description: "สร้างบัญชีสมาชิกไม่สำเร็จ",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Btn variant="outline" size="icon" onClick={() => router.back()}>
            <HugeiconsIcon icon={ArrowLeftIcon} />
          </Btn>
          <div>
            <CardTitle>สร้างบัญชีสมาชิก</CardTitle>
            <CardDescription>สร้างบัญชีสมาชิกใหม่</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="อีเมล"
              type="email"
              placeholder="อีเมล"
              {...methods.register("email")}
              error={methods.formState.errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ชื่อจริง"
              placeholder="ชื่อจริง"
              {...methods.register("firstName")}
              error={methods.formState.errors.firstName?.message}
            />
            <Input
              label="นามสกุล"
              placeholder="นามสกุล"
              {...methods.register("lastName")}
              error={methods.formState.errors.lastName?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              required
              label="เบอร์โทรศัพท์"
              placeholder="เบอร์โทรศัพท์"
              {...methods.register("phone")}
              error={methods.formState.errors.phone?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="เมือง"
              placeholder="เมือง"
              {...methods.register("city")}
              error={methods.formState.errors.city?.message}
            />
            <Input
              label="รัฐ/จังหวัด"
              placeholder="รัฐ/จังหวัด"
              {...methods.register("state")}
              error={methods.formState.errors.state?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="รหัสไปรษณีย์"
              placeholder="รหัสไปรษณีย์"
              {...methods.register("zip")}
              error={methods.formState.errors.zip?.message}
            />
            <Input
              label="ประเทศ"
              placeholder="ประเทศ"
              {...methods.register("country")}
              error={methods.formState.errors.country?.message}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              label="ที่อยู่"
              placeholder="ที่อยู่"
              {...methods.register("address")}
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="radio"
                id="spark"
                value="SPARK"
                className="peer hidden"
                {...methods.register("subscription")}
                defaultChecked
              />
              <label
                htmlFor="spark"
                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-checked:border-orange-500 hover:bg-orange-50 ${
                  methods.watch("subscription") === "SPARK"
                    ? "border-orange-500"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">SPARK</h3>
                    <p className="text-sm text-gray-500">สำหรับผู้เริ่มต้น</p>
                  </div>
                  <div className="text-lg font-bold">฿0</div>
                </div>
              </label>
            </div>

            <div className="relative">
              <input
                type="radio"
                id="pro"
                value="PRO"
                className="peer hidden"
                {...methods.register("subscription")}
              />
              <label
                htmlFor="pro"
                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-checked:border-orange-500 hover:bg-orange-50 ${
                  methods.watch("subscription") === "PRO"
                    ? "border-orange-500"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">PRO</h3>
                    <p className="text-sm text-gray-500">สำหรับธุรกิจ</p>
                  </div>
                  <div className="text-lg font-bold">฿299</div>
                </div>
              </label>
            </div>
          </div> */}

          <div className="flex justify-end gap-2">
            <Btn type="button" variant="outline" onClick={() => router.back()}>
              ยกเลิก
            </Btn>
            <Btn type="submit" disabled={methods.formState.isSubmitting}>
              บันทึก
            </Btn>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
