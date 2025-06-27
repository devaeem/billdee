import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import React from "react";

interface StoreFilterProps {
  onSearch: (value: string) => void;
  onCreate: () => void;
}

const StoreFilter = ({ onSearch, onCreate }: StoreFilterProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-4">
        <Input
          placeholder="ค้นหาร้านค้า..."
          className="max-w-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button onClick={onCreate}>
        <PlusIcon className="mr-2 h-4 w-4" />
        เพิ่มร้านค้า
      </Button>
    </div>
  );
};

export default StoreFilter;
