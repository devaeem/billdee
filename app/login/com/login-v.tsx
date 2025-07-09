"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Input from "@/components/custom-ui/input";
import Btn from "@/components/custom-ui/btn";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  LockIcon,
  MailIcon,
  MoreVerticalSquare01Icon,
  RubiksCubeIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginV = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async (data: LoginFormValues) => {
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50">
      <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[620px]">
        {/* Decorative Elements */}
        <div className="absolute -z-10 inset-0 blur-3xl opacity-30">
          <div className="absolute top-0 -left-4 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-emerald-300 rounded-full mix-blend-multiply animate-blob"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-teal-300 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -top-4 -right-4 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-emerald-200 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40">
          {/* Logo and Menu */}
          <div className="flex items-center justify-between p-6 sm:p-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300 rotate-3 flex items-center justify-center">
                <HugeiconsIcon
                  size={24}
                  className="text-white sm:w-7 sm:h-7"
                  icon={RubiksCubeIcon}
                  color="currentColor"
                  strokeWidth={2}
                />
              </div>
              <span className="text-2xl sm:text-3xl font-bold uppercase tracking-wider ml-1 sm:ml-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                billdee
              </span>
            </div>
            <button className="p-2 sm:p-2.5 hover:bg-emerald-50 rounded-xl transition-all duration-300">
              <HugeiconsIcon
                size={24}
                className="text-emerald-600 sm:w-7 sm:h-7"
                icon={MoreVerticalSquare01Icon}
                color="currentColor"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-3 sm:space-y-4 px-6 pb-6 sm:px-8 sm:pb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Login
            </h1>
            <p className="text-gray-600 text-base sm:text-lg tracking-wide">
              Access your store and bill management system
            </p>
          </div>

          {/* Login Form */}
          <div className="px-6 sm:px-8 pb-3 flex flex-col gap-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="h-12 sm:h-14 border-1 bg-gray-50/50 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 transition-all duration-300 hover:bg-gray-50/80 placeholder:text-gray-400"
                    {...loginForm.register("email")}
                    error={loginForm.formState.errors.email?.message}
                    startIcon={
                      <HugeiconsIcon
                        icon={MailIcon}
                        size={20}
                        className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 cursor-pointer sm:w-6 sm:h-6"
                      />
                    }
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-12 sm:h-14 border-1 bg-gray-50/50 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 pr-10 transition-all duration-300 hover:bg-gray-50/80 placeholder:text-gray-400"
                    {...loginForm.register("password")}
                    error={loginForm.formState.errors.password?.message}
                    startIcon={
                      <HugeiconsIcon
                        icon={LockIcon}
                        size={20}
                        className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 cursor-pointer sm:w-6 sm:h-6"
                      />
                    }
                    endIcon={
                      <HugeiconsIcon
                        icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                        size={20}
                        className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 cursor-pointer sm:w-6 sm:h-6"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    }
                  />
                </div>

                <div className="flex items-center justify-between pt-1 sm:pt-2">
                  <div className="flex items-center justify-center gap-2">
                    <FormField
                      control={loginForm.control}
                      name="remember"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 h-full space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border-gray-300 text-emerald-500 focus:ring-emerald-500 transition-colors duration-300"
                            />
                          </FormControl>
                          <Label
                            htmlFor="remember"
                            className="text-xs sm:text-sm text-gray-500 select-none cursor-pointer hover:text-gray-700 transition-colors duration-300"
                          >
                            Remember me
                          </Label>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Btn
                    type="button"
                    variant="ghost"
                    // onClick={() => setFormState("forgot-password")}
                    className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-300"
                  >
                    Forgot password?
                  </Btn>
                </div>

                <div className="pt-2 sm:pt-4">
                  <Btn
                    type="submit"
                    disabled={loginForm.formState.isSubmitting}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl sm:rounded-2xl text-base sm:text-[1.1rem] font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    {loginForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Btn>
                </div>

                <div className="text-center text-xs sm:text-[0.95rem] text-gray-500 tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 pt-1 sm:pt-2">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-300"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          {/* Footer */}
          <div className="text-center text-xs sm:text-[0.92rem] text-gray-500 px-6 sm:px-8 pb-6 sm:pb-8">
            By continuing, you agree to our{" "}
            <Link
              href="/privacy-policy"
              className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 font-medium"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-of-service"
              className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Add custom animation keyframes */}
        <style jsx global>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoginV;
