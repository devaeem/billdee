"use client";
import React, { useEffect, useState } from "react";
import CardStatus from "./components/card-statu";
import ReportSales from "./components/report-sales";
import ProductBaseSale from "./components/product-base-sale";
import CustomerBaseBuy from "./components/customer-base-buy";
import NoData from "@/components/no-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Store } from "lucide-react";

const DashboardPage = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const store = false;

  useEffect(() => {
    if (!store) {
      setShowAlert(true);
    }
  }, [store]);

  return (
    <>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="border-0 shadow-xl p-0 overflow-hidden max-w-[400px] rounded-3xl bg-white">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/80 to-white/20 pointer-events-none" />

          <div className="relative flex flex-col items-center text-center p-8">
            {/* Illustration Container */}
            <div className="w-52 h-52 relative mb-6 group">
              <div className="absolute inset-0 bg-orange-100 rounded-full opacity-20 group-hover:scale-105 transition-transform duration-300" />
              <Image
                src="/store-empty.svg"
                alt="Empty Store Illustration"
                fill
                className="object-contain scale-90 group-hover:scale-95 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="space-y-2 mb-8">
              <AlertDialogTitle className="text-2xl font-semibold text-gray-900">
                ไม่พบร้านค้า
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[15px] leading-relaxed text-gray-500 max-w-[280px] mx-auto">
                คุณยังไม่มีร้านค้า กรุณาสร้างร้านค้าก่อนใช้งาน
              </AlertDialogDescription>
            </div>

            {/* Action Button */}
            <AlertDialogAction
              onClick={() => router.push("/customer/dashboard/create-shop")}
              className={cn(
                "w-full bg-gradient-to-r from-orange-500 to-red-500",
                "hover:from-orange-600 hover:to-red-600",
                "transition-all duration-300",
                "text-white font-medium text-[15px]",
                "px-6 py-3 rounded-xl",
                "shadow-[0_4px_20px_-4px_rgba(234,88,12,0.3)]",
                "hover:shadow-[0_4px_24px_-4px_rgba(234,88,12,0.4)]",
                "hover:translate-y-[-1px]",
                "flex items-center justify-center gap-2"
              )}
            >
              <Store className="w-4 h-4" />
              สร้างร้านค้า
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {store ? (
        <>
          <CardStatus />
          <ReportSales />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <ProductBaseSale />
            <CustomerBaseBuy />
          </div>
        </>
      ) : (
        <NoData title="คุณยังไม่มีร้านค้า" description="กรุณาลองใหม่อีกครั้ง" />
      )}
    </>
  );
};

export default DashboardPage;
