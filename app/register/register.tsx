"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalSquare01Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Input from "@/components/custom-ui/input";
import Btn from "@/components/custom-ui/btn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Register form schema
const registerFormSchema = z
  .object({
    storeName: z
      .string()
      .min(2, { message: "ชื่อร้านค้าต้องมีความยาวอย่างน้อย 2 ตัวอักษร" }),
    email: z
      .string()
      .min(1, { message: "กรุณากรอกอีเมล" })
      .email("รูปแบบอีเมลไม่ถูกต้อง"),
    phoneNumber: z
      .string()
      .min(10, { message: "เบอร์โทรศัพท์ต้องมีความยาว 10 หลัก" })
      .max(10, { message: "เบอร์โทรศัพท์ต้องมีความยาว 10 หลัก" }),
    password: z
      .string()
      .min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
    confirmPassword: z
      .string()
      .min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      storeName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: RegisterFormValues) => {
    console.log(data);
    try {
      // TODO: Implement registration logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("สมัครสมาชิกสำเร็จ", {
        description: "กำลังนำคุณไปยังหน้าเข้าสู่ระบบ",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("เกิดข้อผิดพลาด", {
          description: error.message,
        });
      } else {
        toast.error("เกิดข้อผิดพลาด", {
          description: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-[420px] space-y-5">
          {/* Logo and Menu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded" />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider ml-2">
                billdee
              </span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <HugeiconsIcon
                size={24}
                icon={MoreVerticalSquare01Icon}
                className="text-gray-600"
                color="currentColor"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Register Form Content */}
          <div className="space-y-2">
            <Link href="/login">
              <Btn
                type="button"
                variant="ghost"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="tracking-wider">กลับไปหน้าเข้าสู่ระบบ</span>
              </Btn>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
              สมัครสมาชิก
            </h1>
            <p className="text-gray-600 tracking-wider">
              เริ่มต้นใช้งานระบบจัดการร้านค้าของคุณ
            </p>
          </div>

          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(handleRegister)}
              className="space-y-6"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={registerForm.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="ชื่อร้านค้า"
                          className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="อีเมล"
                          type="email"
                          className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="เบอร์โทรศัพท์"
                          className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="รหัสผ่าน"
                          className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500 pr-10"
                          endIcon={
                            <HugeiconsIcon
                              icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                              size={24}
                              className="text-gray-600 cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="ยืนยันรหัสผ่าน"
                          className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500 pr-10"
                          endIcon={
                            <HugeiconsIcon
                              icon={
                                showConfirmPassword
                                  ? ViewOffSlashIcon
                                  : ViewIcon
                              }
                              size={24}
                              className="text-gray-600 cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Btn
                type="submit"
                disabled={registerForm.formState.isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300"
              >
                {registerForm.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังสมัครสมาชิก...
                  </>
                ) : (
                  "สมัครสมาชิก"
                )}
              </Btn>

              <div className="text-center text-sm text-gray-600">
                มีบัญชีอยู่แล้ว?{" "}
                <Link
                  href="/login"
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  เข้าสู่ระบบ
                </Link>
              </div>
            </form>
          </Form>

          <div className="text-center text-sm text-gray-600">
            เมื่อสมัครสมาชิก ฉันได้ยอมรับ{" "}
            <Link href="/privacy-policy" className="text-orange-500">
              นโยบายความเป็นส่วนตัว
            </Link>{" "}
            และ{" "}
            <Link href="/terms-of-service" className="text-orange-500">
              เงื่อนไขการใช้บริการ
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Gradient Background */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-red-500 to-orange-500 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[length:100px_100px] opacity-20" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-sm rounded-[3rem] p-8 text-white text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-wider">
              ยินดีต้อนรับสู่ BillDee
            </h2>
            <p className="text-lg text-white/90">
              ระบบจัดการร้านค้าและบิลออนไลน์ที่ช่วยให้ธุรกิจของคุณเติบโต
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">จัดการง่าย</h3>
                <p className="text-white/80">
                  ระบบที่ใช้งานง่าย ช่วยให้คุณจัดการร้านได้อย่างมีประสิทธิภาพ
                </p>
              </div>
              <div className="bg-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">ติดตามยอดขาย</h3>
                <p className="text-white/80">
                  ดูรายงานและวิเคราะห์ข้อมูลเพื่อพัฒนาธุรกิจของคุณ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
