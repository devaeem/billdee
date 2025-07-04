"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { MoreVertical, ArrowLeft, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
          <div className="w-full max-w-[420px] space-y-10">
            {/* Logo and Menu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full" />
                <span className="text-xl font-semibold">BillDee</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
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
                    <span>กลับไปหน้าเข้าสู่ระบบ</span>
                  </Button>
                  <h1 className="text-3xl font-bold text-gray-900">
                    สมัครสมาชิก
                  </h1>
                  <p className="text-gray-600">
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
                            "https://www.facebook.com/jatupon.dawruang",
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
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    เข้าสู่ระบบ
                  </h1>
                  <p className="text-gray-600">
                    เข้าถึงระบบจัดการร้านค้าและบิลของคุณ
                  </p>
                </div>

                {/* Login Form */}
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(handleLogin)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
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
                              <Input
                                type="password"
                                placeholder="รหัสผ่าน"
                                className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={loginForm.control}
                          name="remember"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="rounded-lg border-gray-300 text-red-500 focus:ring-red-500"
                                />
                              </FormControl>
                              <label
                                htmlFor="remember"
                                className="text-sm text-gray-600"
                                onClick={() => field.onChange(!field.value)}
                              >
                                จดจำฉันไว้
                              </label>
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setFormState("forgot-password")}
                        className="text-sm text-red-500 hover:text-red-600 font-medium h-auto p-0"
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

                    <div className="text-center text-sm text-gray-600">
                      ยังไม่มีบัญชี?{" "}
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setFormState("register")}
                        className="text-red-500 hover:text-red-600 font-medium h-auto p-0"
                      >
                        สมัครสมาชิก
                      </Button>
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Gradient Background with Image */}
        <div className="hidden lg:block w-1/2 bg-gradient-to-br from-red-500 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="w-full max-w-xl aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-[3rem] shadow-2xl transform -rotate-12 overflow-hidden">
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-white text-2xl font-bold">
                      ฿40,832.32
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-24 bg-white/20 rounded-2xl transform transition-transform hover:scale-105"
                      />
                    ))}
                  </div>
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
