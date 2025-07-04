"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { IconShoppingBag } from "@tabler/icons-react";

const ShopEmty = () => {
  return (
    <div className="relative p-[2px] rounded-xl ">
      <div className="absolute inset-0 rounded-xl border-1 border-dashed border-gray-200  " />
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center  rounded-xl x relative z-10">
        <div className="relative mb-6 p-6 rounded-full bg-primary/10 ">
          <IconShoppingBag className="size-16 text-primary " />
        </div>
        <div className="space-y-3 max-w-md">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            ยังไม่มีร้านค้า
          </h2>
          <p className="text-muted-foreground text-lg">
            เริ่มต้นธุรกิจของคุณด้วยการสร้างร้านค้าแรกของคุณ
            เพียงไม่กี่ขั้นตอนง่ายๆ
          </p>
        </div>
        <Button
          size="lg"
          className="mt-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <PlusCircle className="size-5" />
          สร้างร้านค้าใหม่
        </Button>
      </div>
    </div>
  );
};

export default ShopEmty;
