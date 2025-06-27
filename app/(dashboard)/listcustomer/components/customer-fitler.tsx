"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";

interface CustomerFilterProps {
  onSearch?: (value: string) => void;
  onCreate?: () => void;
}

const CustomerFitler = ({ onSearch, onCreate }: CustomerFilterProps) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Search customer..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
      <Button onClick={onCreate} className="whitespace-nowrap">
        <PlusIcon className="h-4 w-4" />
        Create Customer
      </Button>
    </div>
  );
};

export default CustomerFitler;
