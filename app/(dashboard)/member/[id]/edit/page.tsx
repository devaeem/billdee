"use client";

import { useParams, useRouter } from "next/navigation";
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
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "@/components/custom-ui/input";
import Select from "@/components/custom-ui/select";
import { Textarea } from "@/components/custom-ui/textarea";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"]),
  plan: z.enum(["free", "pro"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  zipcode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface User extends FormValues {
  id: string;
  isActive: string;
}

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const { data: user } = useSWR<User>(`users/${params.id}`);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: user,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: Implement user update API call here
      console.log("Updating user:", data);
      router.back();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Btn variant="outline" size="icon" onClick={() => router.back()}>
            <HugeiconsIcon icon={ArrowLeftIcon} />
          </Btn>
          <div>
            <CardTitle>แก้ไขข้อมูลสมาชิก</CardTitle>
            <CardDescription>แก้ไขข้อมูลสมาชิก</CardDescription>
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
            <Select
              label="สิทธิ์การใช้งาน"
              error={methods.formState.errors.role?.message}
              placeholder="สิทธิ์การใช้งาน"
              options={[
                { label: "ผู้ดูแลระบบ", value: "admin" },
                { label: "ผู้ใช้งาน", value: "user" },
              ]}
              value={methods.watch("role")}
              onValueChange={(value) =>
                methods.setValue("role", value as "admin" | "user")
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              label="รายละเอียดที่อยู่"
              placeholder="รายละเอียดที่อยู่"
              {...methods.register("province")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="radio"
                id="free"
                value="free"
                className="peer hidden"
                {...methods.register("plan")}
              />
              <label
                htmlFor="free"
                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-checked:border-orange-500 hover:bg-orange-50 ${
                  methods.watch("plan") === "free" ? "border-orange-500" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">ฟรี</h3>
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
                value="pro"
                className="peer hidden"
                {...methods.register("plan")}
              />
              <label
                htmlFor="pro"
                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-checked:border-orange-500 hover:bg-orange-50 ${
                  methods.watch("plan") === "pro" ? "border-orange-500" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Pro</h3>
                    <p className="text-sm text-gray-500">สำหรับธุรกิจ</p>
                  </div>
                  <div className="text-lg font-bold">฿299</div>
                </div>
              </label>
            </div>
          </div>

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
