"use client";

import Btn from "@/components/custom-ui/btn";
import Input from "@/components/custom-ui/input";
import {
  PlusSignCircleIcon,
  PlusSignSquareIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusIcon } from "lucide-react";
import React from "react";

interface ProductFilterProps {
  setIsOpen: (isOpen: boolean) => void;
  setMode: (mode: "create" | "edit" | "view") => void;
}

const ProductFilter = ({ setIsOpen, setMode }: ProductFilterProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full">
          <div className="w-full">
            <Input
              placeholder="ค้นหาสินค้า..."
              startIcon={
                <HugeiconsIcon
                  icon={SearchIcon}
                  size={20}
                  className="text-muted-foreground"
                />
              }
              className="h-10"
            />
          </div>

          <Btn
            startIcon={
              <HugeiconsIcon
                icon={PlusSignCircleIcon}
                size={24}
                strokeWidth={2}
                color="currentColor"
                className="font-bold text-black"
              />
            }
            className=""
            variant="outline"
            onClick={() => {
              setIsOpen(true);
              setMode("create");
            }}
          >
            เพิ่มสินค้า
          </Btn>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
