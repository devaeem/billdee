"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import React from "react";

interface ProductFilterProps {
  setIsOpen: (isOpen: boolean) => void;
}

const ProductFilter = ({ setIsOpen }: ProductFilterProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Input placeholder="ค้นหาสินค้า..." className="w-full" />
          <Button onClick={() => setIsOpen(true)}>
            <PlusIcon className="w-4 h-4" /> เพิ่มสินค้า
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
