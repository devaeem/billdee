"use client";
import { ModalForm } from "@/components/custom-ui/modal/modal-from";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

const CardNoShop = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="สร้างร้านค้า"
        onSubmit={() => {}}
      >
        <div>
          <h1>สร้างร้านค้า</h1>
        </div>
      </ModalForm>
      <Card
        onClick={() => setIsOpen(true)}
        className="bg-white border-0 border-gray-200 rounded-4xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      >
        <CardContent className="flex flex-col items-center justify-center gap-4 h-full p-10">
          <div className="flex flex-col items-center justify-center gap-4 bg-stone-100 rounded-full p-2 w-20 h-20">
            <HugeiconsIcon
              icon={ShoppingBag01Icon}
              size={40}
              className="leading-relaxed text-slate-500  "
            />
          </div>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">
            คุณยังไม่มีร้านค้า กรุณาสร้างร้านค้าเพื่อเริ่มต้นใช้งาน
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default CardNoShop;
