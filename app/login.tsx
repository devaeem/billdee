"use client";
import React, { useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Input from "@/components/custom-ui/input";
import Btn from "@/components/custom-ui/btn";
import { useProfile } from "@/hooks/use-profile";

type FormState = "login" | "forgot-password" | "register";

// Login form schema
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z
    .string()
    .min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
  remember: z.boolean().default(false).optional(),
});

const resetPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
// type RegisterFormValues = z.infer<typeof registerFormSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

const Login = () => {
  const router = useRouter();
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      loginForm.setValue("email", rememberedEmail);
      loginForm.setValue("remember", true);
    }
  }, [loginForm]);

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    // Handle remember me
    if (data.remember) {
      localStorage.setItem("rememberedEmail", data.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.ok) {
      toast.success("เข้าสู่ระบบสำเร็จ", {
        description: "กำลังนำคุณไปยังหน้าหลัก",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      toast.error("เข้าสู่ระบบไม่สำเร็จ", {
        description: "กรุณาตรวจสอบอีเมลและรหัสผ่าน",
      });
    }
  };

  // const handleResetPassword = async (data: ResetPasswordFormValues) => {
  //   console.log(data, "data");
  //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
  //   toast.success("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว", {
  //     description: "กรุณาตรวจสอบอีเมลของคุณ",
  //   });
  //   resetPasswordForm.reset();
  // };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-full flex flex-col items-center justify-center p-6 lg:p-20">
          <div className="w-full max-w-[420px] space-y-5">
            {/* Logo and Menu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded" />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider ml-2">
                  billdee
                </span>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
                เข้าสู่ระบบ
              </h1>
              <p className="text-gray-600 tracking-wider">
                ระบบบิลออนไลน์ | จัดการบิลและค่าใช้จ่าย
              </p>
            </div>

            {/* Login Form */}

            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="flex flex-col gap-6 w-full"
            >
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="อีเมล"
                  type="email"
                  className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                  {...loginForm.register("email")}
                  error={loginForm.formState.errors.email?.message}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500 pr-10"
                  {...loginForm.register("password")}
                  endIcon={
                    <HugeiconsIcon
                      icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                      size={24}
                      className="text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  }
                  error={loginForm.formState.errors.password?.message}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                  <Checkbox
                    checked={loginForm.watch("remember")}
                    onCheckedChange={(checked) =>
                      loginForm.setValue("remember", checked === true)
                    }
                    className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    จดจำฉันไว้
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-gray-600">
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              <Btn
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300"
              >
                {loginForm.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </Btn>

              <div className="text-center text-sm text-gray-600 tracking-wider flex items-center justify-center ">
                ยังไม่มีบัญชีกับเรา??{" "}
                <Link href="/register" className="text-sm text-red-500 ml-2">
                  สมัครใช้งาน
                </Link>
              </div>
            </form>

            <div className="text-center text-sm text-gray-600">
              เมื่อเข้าสู่ระบบ ฉันได้ยอมรับ{" "}
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
      </div>

      <AlertDialog open={showRegisterAlert} onOpenChange={setShowRegisterAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ขั้นตอนการสมัครสมาชิก</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                เพื่อให้เราสามารถให้บริการที่ดีที่สุด
                กรุณาติดต่อเราโดยตรงเพื่อเปิดบัญชีใช้งาน
              </p>
              <p className="font-medium">📘 FB: Jatupon Dawruang</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Btn
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                onClick={() =>
                  window.open("https://www.facebook.com/jatupon.dr", "_blank")
                }
              >
                ติดต่อผ่าน Facebook
              </Btn>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Login;
