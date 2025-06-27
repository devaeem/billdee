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
import CustomerFitler from "./customer-fitler";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

const ListCustomerManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const columns: ColumnDef<Customer>[] = [
    {
      header: "ชื่อลูกค้า",
      accessorKey: "name",
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    },
    {
      header: "อีเมล",
      accessorKey: "email",
      cell: ({ row }) => {
        return <div>{row.original.email}</div>;
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
      header: "สถานะ",
      accessorKey: "status",
      cell: ({ row }) => {
        return <div>{row.original.status}</div>;
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
      name: "สมชาย สมหญิง",
      email: "somchai@gmail.com",
      phone: "0812345678",
      status: "สมัครสมาชิก",
    },
    {
      id: 2,
      name: "สมหญิง สมชาย",
      email: "somying@gmail.com",
      phone: "0812345678",
      status: "สมัครสมาชิก",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            รายชื่อลูกค้า
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            ตารางรายการชื่อลูกค้าของระบบ
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <CustomerFitler
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

export default ListCustomerManagement;
