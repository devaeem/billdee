"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Chart01Icon,
  Home01Icon,
  Invoice04Icon,
  MoreVerticalSquare01Icon,
  PackageSearchIcon,
  Settings01Icon,
  ViewIcon,
  ViewOffSlashIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

// Register form schema
// const registerFormSchema = z
//   .object({
//     storeName: z
//       .string()
//       .min(2, { message: "ชื่อร้านค้าต้องมีความยาวอย่างน้อย 2 ตัวอักษร" }),
//     email: z
//       .string()
//       .min(1, { message: "กรุณากรอกอีเมล" })
//       .email("รูปแบบอีเมลไม่ถูกต้อง"),
//     phoneNumber: z
//       .string()
//       .min(10, { message: "เบอร์โทรศัพท์ต้องมีความยาว 10 หลัก" })
//       .max(10, { message: "เบอร์โทรศัพท์ต้องมีความยาว 10 หลัก" }),
//     password: z
//       .string()
//       .min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
//     confirmPassword: z
//       .string()
//       .min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "รหัสผ่านไม่ตรงกัน",
//     path: ["confirmPassword"],
//   });

// Reset password form schema
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
  const [formState, setFormState] = useState<FormState>("login");
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

  // Register form
  // const registerForm = useForm<RegisterFormValues>({
  //   resolver: zodResolver(registerFormSchema),
  //   defaultValues: {
  //     storeName: "",
  //     email: "",
  //     phoneNumber: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  // });

  // Reset password form
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

  const handleResetPassword = async (data: ResetPasswordFormValues) => {
    console.log(data, "data");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    toast.success("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว", {
      description: "กรุณาตรวจสอบอีเมลของคุณ",
    });
    setFormState("login");
    resetPasswordForm.reset();
  };

  // const handleRegister = async (data: RegisterFormValues) => {
  //   // TODO: Implement registration logic
  //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
  //   toast.success("สมัครสมาชิกสำเร็จ", {
  //     description: "กำลังนำคุณไปยังหน้าเข้าสู่ระบบ",
  //   });
  //   setFormState("login");
  //   registerForm.reset();
  // };

  // const handleRegisterClick = () => {
  //   setShowRegisterAlert(true);
  // };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Login Form */}
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

            {formState === "forgot-password" ? (
              <>
                {/* Forgot Password Form */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormState("login")}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>กลับไปหน้าเข้าสู่ระบบ</span>
                  </Button>
                  <h1 className="text-3xl font-bold text-gray-900">
                    ลืมรหัสผ่าน?
                  </h1>
                  <p className="text-gray-600">
                    กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับรีเซ็ตรหัสผ่าน
                  </p>
                </div>

                <Form {...resetPasswordForm}>
                  <form
                    onSubmit={resetPasswordForm.handleSubmit(
                      handleResetPassword
                    )}
                    className="space-y-6"
                  >
                    <FormField
                      control={resetPasswordForm.control}
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

                    <Button
                      type="submit"
                      disabled={resetPasswordForm.formState.isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300"
                    >
                      {resetPasswordForm.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          กำลังส่งลิงก์...
                        </>
                      ) : (
                        "ส่งลิงก์รีเซ็ตรหัสผ่าน"
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            ) : formState === "register" ? (
              <>
                {/* Register Info */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormState("login")}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="tracking-wider">
                      กลับไปหน้าเข้าสู่ระบบ
                    </span>
                  </Button>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
                    สมัครสมาชิก
                  </h1>
                  <p className="text-gray-600 tracking-wider">
                    เริ่มต้นใช้งานระบบจัดการร้านค้าของคุณ
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="space-y-4">
                      <div className="text-lg font-semibold text-blue-900">
                        ขั้นตอนการสมัครสมาชิก
                      </div>
                      <div className="text-blue-600 space-y-2">
                        <p>
                          เพื่อให้เราสามารถให้บริการที่ดีที่สุด
                          กรุณาติดต่อเราโดยตรงเพื่อเปิดบัญชีใช้งาน
                        </p>
                        <p className="font-medium">📘 FB: Jatupon Dawruang</p>
                      </div>
                      <Button
                        type="button"
                        className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl"
                        onClick={() =>
                          window.open(
                            "https://www.facebook.com/jatupon.dr",
                            "_blank"
                          )
                        }
                      >
                        ติดต่อผ่าน Facebook
                      </Button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    มีบัญชีอยู่แล้ว?{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setFormState("login")}
                      className="text-red-500 hover:text-red-600 font-medium h-auto p-0"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Welcome Text */}
                <div className="flex flex-col gap-1 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-wider">
                    เข้าสู่ระบบ
                  </h1>
                  <p className="text-gray-600 tracking-wider">
                    เข้าถึงระบบจัดการร้านค้าและบิลของคุณ
                  </p>
                </div>

                {/* Login Form */}
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(handleLogin)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={loginForm.control}
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
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="password"
                                  className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500 pr-10"
                                  {...field}
                                />

                                <HugeiconsIcon
                                  icon={
                                    showPassword ? ViewOffSlashIcon : ViewIcon
                                  }
                                  size={24}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                  color="currentColor"
                                  strokeWidth={1.5}
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                />
                                {/* <EyeIcon className="w-6 h-6 " /> */}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between">
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
                                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                                />
                              </FormControl>
                              <Label
                                htmlFor="remember"
                                className="text-sm text-gray-600"
                              >
                                จดจำฉันไว้
                              </Label>
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setFormState("forgot-password")}
                        className="text-sm text-red-500 hover:text-red-600 font-medium h-auto p-0 hover:no-underline"
                      >
                        ลืมรหัสผ่าน?
                      </Button>
                    </div>

                    <Button
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
                    </Button>

                    <div className="text-center text-sm text-gray-600 tracking-wider">
                      ยังไม่มีบัญชีกับเรา??{" "}
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setFormState("register")}
                        className="text-red-500 hover:text-red-600 font-medium h-auto p-0 tracking-wider"
                      >
                        สมัครใช้งาน
                      </Button>
                    </div>
                  </form>
                </Form>
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
              </>
            )}
          </div>
        </div>

        {/* Right Side - Gradient Background with Image */}
        <div className="hidden lg:block w-1/2 bg-gradient-to-br from-red-500 to-orange-500 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[length:100px_100px] opacity-20" />
          </div>

          {/* Main content container */}
          <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="w-full max-w-xl bg-white/10 backdrop-blur-sm rounded-[3rem] shadow-2xl transform -rotate-12 overflow-hidden transition-all duration-500 hover:rotate-0 hover:scale-105">
              <div className="p-8">
                {/* Header section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-float-slow">
                        <HugeiconsIcon
                          icon={Invoice04Icon}
                          size={24}
                          className="text-white"
                          color="currentColor"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-bold tracking-wider uppercase">
                          BillDee
                        </h3>
                        <p className="text-white/80 text-sm tracking-wider font-medium">
                          ระบบบิลออนไลน์ | จัดการบิลและค่าใช้จ่าย
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white/80 text-sm">ออนไลน์</span>
                    </div>
                  </div>

                  {/* Stats overview */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 rounded-2xl p-4 animate-float-slow">
                      <p className="text-white/80 text-sm mb-1">รายได้วันนี้</p>
                      <h4 className="text-white text-2xl font-bold tracking-wider">
                        ฿X,XXX.XX
                      </h4>
                      <p className="text-green-700 text-sm mt-1">
                        +X.X% จากเมื่อวาน
                      </p>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-4 animate-float-delay">
                      <p className="text-white/80 text-sm mb-1">จำนวนบิล</p>
                      <h4 className="text-white text-2xl font-bold tracking-wider">
                        X
                      </h4>
                      <p className="text-green-700 text-sm mt-1">
                        +X.X% จากเมื่อวาน
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick actions grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: (
                        <HugeiconsIcon
                          icon={Chart01Icon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      ),
                      title: "รายงาน",
                      delay: "animate-float-slow",
                    },
                    {
                      icon: (
                        <HugeiconsIcon
                          icon={Invoice04Icon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      ),
                      title: "สร้างบิล",
                      delay: "animate-float-delay",
                    },
                    {
                      icon: (
                        <HugeiconsIcon
                          icon={PackageSearchIcon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      ),
                      title: "สินค้า",
                      delay: "animate-float-slow",
                    },
                    {
                      icon: (
                        <HugeiconsIcon
                          icon={Wallet01Icon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      ),
                      title: "การเงิน",
                      delay: "animate-float-delay",
                    },
                    {
                      icon: (
                        <HugeiconsIcon
                          icon={Home01Icon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      ),
                      title: "แดชบอร์ด",
                      delay: "animate-float-slow",
                    },
                    {
                      icon: (
                        <HugeiconsIcon
                          icon={Settings01Icon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="text-white"
                        />
                      ),
                      title: "ตั้งค่า",
                      delay: "animate-float-delay",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`h-24 bg-white/20 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/30 flex flex-col items-center justify-center gap-2 cursor-pointer group ${item.delay}`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <p className="text-white text-sm font-medium">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Activity indicators */}
                <div className="mt-8 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-float-slow" />
                  <div className="w-2 h-2 bg-white rounded-full animate-float-delay" />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-float-slow" />
                </div>
              </div>
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
              <Button
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                onClick={() =>
                  window.open("https://www.facebook.com/jatupon.dr", "_blank")
                }
              >
                ติดต่อผ่าน Facebook
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Login;
