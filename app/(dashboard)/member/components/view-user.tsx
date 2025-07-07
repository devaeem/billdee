"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Btn from "@/components/custom-ui/btn";
import { ArrowLeftIcon, EditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  isActive: string;
  address: string;
  city: string;
  province: string;
  zipcode: string;
  accounts: {
    subscription: string;
    address: string;
    city: string;
    province: string;
    zipcode: string;
    phone: string;
  }[];
}

interface HttpPaginationResponse<T> {
  data: {
    data: T;
  };
}

const ViewUser = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: user, error } = useSWR<HttpPaginationResponse<User>>(
    `users/${id}`,
    {
      revalidateOnFocus: false,
    }
  );

  console.log("user", user?.data?.data);

  if (error) {
    return (
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <Btn
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeftIcon} />
            </Btn>
            <div>
              <CardTitle className="text-2xl">ข้อมูลสมาชิก</CardTitle>
              <CardDescription>ดูข้อมูลสมาชิก</CardDescription>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* ข้อมูลพื้นฐาน */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ข้อมูลพื้นฐาน</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">อีเมล</h4>
                  <p className="font-medium">{user?.data?.data.email}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">ชื่อ-นามสกุล</h4>
                  <p className="font-medium">
                    {user?.data?.data.firstName} {user?.data?.data.lastName}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">เบอร์โทรศัพท์</h4>
                  <p className="font-medium">
                    {user?.data?.data?.accounts[0]?.phone || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">สิทธิ์การใช้งาน</h4>
                  <p className="font-medium">
                    {user?.data?.data.role === "ADMIN"
                      ? "ผู้ดูแลระบบ"
                      : "ผู้ใช้งาน"}
                  </p>
                </div>
              </div>
            </div>

            {/* สถานะและแพ็กเกจ */}
            <div>
              <h3 className="text-lg font-semibold mb-4">สถานะและแพ็กเกจ</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">สถานะ</h4>
                  <Badge
                    variant="outline"
                    className={`${
                      user?.data?.data.isActive ? "bg-green-500" : "bg-red-500"
                    } text-white border-none`}
                  >
                    {user?.data?.data.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">แพ็กเกจ</h4>
                  <Badge
                    variant="outline"
                    className={`${
                      user?.data?.data?.accounts[0]?.subscription === "SPARK"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    } text-white border-none`}
                  >
                    {user?.data?.data?.accounts[0]?.subscription}
                  </Badge>
                </div>
              </div>
            </div>

            {/* ที่อยู่ */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ที่อยู่</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="font-medium">
                  {user?.data?.data?.accounts[0]?.address || "-"}
                </p>
                <p className="text-gray-600">
                  {[
                    user?.data?.data?.accounts[0]?.city,
                    user?.data?.data?.accounts[0]?.province,
                    user?.data?.data?.accounts[0]?.zipcode,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Btn
            variant="outline"
            startIcon={<HugeiconsIcon icon={EditIcon} size={16} />}
            onClick={() => router.push(`/member/${id}/edit`)}
            className="hover:bg-gray-100 transition-colors"
          >
            แก้ไขข้อมูล
          </Btn>
        </CardFooter>
      </Card>
    </>
  );
};

export default ViewUser;
