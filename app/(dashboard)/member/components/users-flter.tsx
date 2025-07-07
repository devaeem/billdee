"use client";

import Btn from "@/components/custom-ui/btn";
import Input from "@/components/custom-ui/input";
import { PlusSignCircleIcon, SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

interface UsersFilterProps {
  setSearch?: (search: string) => void;
  onCreateClick: () => void;
}

const UsersFilter = ({ setSearch, onCreateClick }: UsersFilterProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full">
          <div className="w-full">
            <Input
              placeholder="ค้นหาสมาชิก..."
              onChange={(e) => setSearch?.(e.target.value)}
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
            onClick={onCreateClick}
          >
            เพิ่มสมาชิก
          </Btn>
        </div>
      </div>
    </>
  );
};

export default UsersFilter;
