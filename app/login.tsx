"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { MoreVertical, ArrowLeft } from "lucide-react";

type FormState = "login" | "forgot-password" | "register";

const Login = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  // Register form states
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    phoneNumber: "",
  });

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    console.log(result, "result");
    if (result?.ok) {
      toast.success("เข้าสู่ระบบสำเร็จ", {
        description: "กำลังนำคุณไปยังหน้าหลัก",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      console.log(result);
      toast.error("เข้าสู่ระบบไม่สำเร็จ", {
        description: "กรุณาตรวจสอบอีเมลและรหัสผ่าน",
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    toast.success("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว", {
      description: "กรุณาตรวจสอบอีเมลของคุณ",
    });
    setFormState("login");
    setResetEmail("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน", {
        description: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
      });
      return;
    }
    // TODO: Implement registration logic
    toast.success("สมัครสมาชิกสำเร็จ", {
      description: "กำลังนำคุณไปยังหน้าเข้าสู่ระบบ",
    });
    setFormState("login");
    setRegisterData({
      email: "",
      password: "",
      confirmPassword: "",
      storeName: "",
      phoneNumber: "",
    });
  };

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
                <button
                  onClick={() => setFormState("login")}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>กลับไปหน้าเข้าสู่ระบบ</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                  ลืมรหัสผ่าน?
                </h1>
                <p className="text-gray-600">
                  กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับรีเซ็ตรหัสผ่าน
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    id="reset-email"
                    placeholder="อีเมล"
                    type="email"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300"
                >
                  ส่งลิงก์รีเซ็ตรหัสผ่าน
                </Button>
              </form>
            </>
          ) : formState === "register" ? (
            <>
              {/* Register Form */}
              <div className="space-y-2">
                <button
                  onClick={() => setFormState("login")}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>กลับไปหน้าเข้าสู่ระบบ</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                  สมัครสมาชิก
                </h1>
                <p className="text-gray-600">
                  สร้างบัญชีใหม่เพื่อเริ่มใช้งานระบบจัดการร้านค้า
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    name="storeName"
                    placeholder="ชื่อร้านค้า"
                    type="text"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={registerData.storeName}
                    onChange={handleRegisterInputChange}
                  />
                  <Input
                    name="email"
                    placeholder="อีเมล"
                    type="email"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={registerData.email}
                    onChange={handleRegisterInputChange}
                  />
                  <Input
                    name="phoneNumber"
                    placeholder="เบอร์โทรศัพท์"
                    type="tel"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={registerData.phoneNumber}
                    onChange={handleRegisterInputChange}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                  />
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="ยืนยันรหัสผ่าน"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterInputChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300"
                >
                  สมัครสมาชิก
                </Button>

                <div className="text-center text-sm text-gray-600">
                  มีบัญชีอยู่แล้ว?{" "}
                  <button
                    type="button"
                    onClick={() => setFormState("login")}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
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
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <Input
                    id="email"
                    placeholder="อีเมล"
                    type="email"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    required
                    className="h-14 bg-gray-50 border-0 rounded-2xl text-base focus:ring-2 focus:ring-red-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="rounded-lg border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      จดจำฉันไว้
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormState("forgot-password")}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    ลืมรหัสผ่าน?
                  </button>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300"
                >
                  เข้าสู่ระบบ
                </Button>

                <div className="text-center text-sm text-gray-600">
                  ยังไม่มีบัญชี?{" "}
                  <button
                    type="button"
                    onClick={() => setFormState("register")}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    สมัครสมาชิก
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">หรือ</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full h-14 px-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-base font-medium text-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span>เข้าสู่ระบบด้วย Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full h-14 px-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-base font-medium text-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Image
                      src="/twitter.svg"
                      alt="Twitter"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span>เข้าสู่ระบบด้วย Twitter</span>
                  </button>
                </div>
              </form>
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
  );
};

export default Login;
