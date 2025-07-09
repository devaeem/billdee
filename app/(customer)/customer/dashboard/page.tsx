"use client";
import React, { useEffect, useState } from "react";
import CardStatus from "./components/card-statu";
import ReportSales from "./components/report-sales";
import ProductBaseSale from "./components/product-base-sale";
import CustomerBaseBuy from "./components/customer-base-buy";
import NoData from "@/components/no-data";
import { Modal } from "@/components/custom-ui/modal/modal";
import Btn from "@/components/custom-ui/btn";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { StoreRemove02Icon } from "@hugeicons/core-free-icons";

const DashboardPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const store = true;

  useEffect(() => {
    if (!store) {
      setShowModal(true);
    }
  }, [store]);

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className="border-0 shadow-xl p-0 overflow-hidden rounded-3xl "
      >
        <div className="flex flex-col items-center text-center p-8">
          {/* Icon Container with Animation */}
          <div className="relative mb-8 group">
            <div
              className="absolute inset-0 bg-orange-100/50 rounded-full blur-2xl transform group-hover:scale-110 transition-all duration-300"
              style={{
                width: "120px",
                height: "120px",
                top: "-10px",
                left: "-10px",
              }}
            />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-lg transform group-hover:scale-105 transition-all duration-300">
              <HugeiconsIcon
                icon={StoreRemove02Icon}
                size={64}
                className="text-orange-600"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
              ไม่พบร้านค้า
            </h2>
            <p className="text-[15px] leading-relaxed text-gray-600 max-w-[300px] mx-auto">
              คุณยังไม่มีร้านค้า กรุณาสร้างร้านค้าก่อนใช้งาน
            </p>
          </div>

          {/* Action Button */}
          <div className="w-full max-w-[280px]">
            <Btn
              onClick={() => router.push("/customer/dashboard/create-shop")}
              className="w-full h-11 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
            >
              สร้างร้านค้า
            </Btn>
          </div>
        </div>
      </Modal>

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
