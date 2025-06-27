"use client";

import Paginations from "@/components/custom-ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import StoreFilter from "./store-filter";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Store {
  id: number;
  name: string;
  owner: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
}

const ListStoreManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const columns: ColumnDef<Store>[] = [
    {
      header: "ชื่อร้านค้า",
      accessorKey: "name",
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    },
    {
      header: "เจ้าของร้าน",
      accessorKey: "owner",
      cell: ({ row }) => {
        return <div>{row.original.owner}</div>;
      },
    },
    {
      header: "เบอร์โทรศัพท์",
      accessorKey: "phone",
      cell: ({ row }) => {
        return <div>{row.original.phone}</div>;
      },
    },
    {
      header: "ที่อยู่",
      accessorKey: "address",
      cell: ({ row }) => {
        return <div className="max-w-xs truncate">{row.original.address}</div>;
      },
    },
    {
      header: "สถานะ",
      accessorKey: "status",
      cell: ({ row }) => {
        return (
          <Badge
            variant={row.original.status === "active" ? "default" : "secondary"}
          >
            {row.original.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
          </Badge>
        );
      },
    },
    {
      header: "จัดการ",
      accessorKey: "action",
      cell: () => {
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="text-blue-500">
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-green-500">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-red-500">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "ร้านอาหารบ้านสวน",
      owner: "คุณสมชาย ใจดี",
      phone: "0812345678",
      address: "123/45 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
      status: "active",
    },
    {
      id: 2,
      name: "ร้านกาแฟดริป",
      owner: "คุณสมหญิง รักดี",
      phone: "0898765432",
      address: "456 ถ.เพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
      status: "inactive",
    },
  ] as Store[];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            รายการร้านค้า
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            ตารางแสดงรายการร้านค้าทั้งหมดในระบบ
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <StoreFilter
              onSearch={(value) => {
                console.log(value);
              }}
              onCreate={() => {
                console.log("create");
              }}
            />
            <DataTable columns={columns} data={data} />
            <div className="flex justify-end">
              <Paginations
                totalItems={100}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                onItemsPerPageChange={(items) => {
                  setItemsPerPage(items);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ListStoreManagement;
