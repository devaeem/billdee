"use client";
import Paginations from "@/components/custom-ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import ProductFilter from "./product-flter";
import ProductModal from "./modal/product-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import Btn from "@/components/custom-ui/btn";

interface Product {
  product_name: string;
  price: number;
  price_sale: number;
  description: string;
}

const ProductMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view" | "">("create");

  const columns: ColumnDef<Product>[] = [
    {
      header: "ชื่อสินค้า",
      accessorKey: "product_name",
    },
    {
      header: "ราคา",
      accessorKey: "price",
    },

    {
      header: "ราคาขายต้นทุน",
      accessorKey: "price_sale",
    },
    {
      header: "",
      accessorKey: "handle",
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 ">
            <Btn
              onClick={() => {
                setMode("view");
                setIsOpen(true);
              }}
              variant="outline"
              size="sm"
              className="rounded-md"
            >
              <IconEye className="w-4 h-4" />
            </Btn>
            <Btn
              onClick={() => {
                setMode("edit");
                setIsOpen(true);
              }}
              variant="outline"
              size="sm"
              className="rounded-md"
            >
              <IconEdit className="w-4 h-4" />
            </Btn>
            <Btn variant="outline" size="sm" className="rounded-md">
              <IconTrash className="w-4 h-4" />
            </Btn>
          </div>
        );
      },
    },
  ];

  const data: Product[] = [
    {
      product_name: "สินค้า 1",
      price: 100,
      price_sale: 100,
      description: "สินค้า 1",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
          <CardDescription>รายการสินค้าที่คุณสามารถจัดการได้</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ProductFilter setIsOpen={setIsOpen} setMode={setMode} />
          <DataTable data={data} columns={columns} />
          <Paginations
            totalItems={10}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </CardContent>
      </Card>

      <ProductModal isOpen={isOpen} setIsOpen={setIsOpen} mode={mode} />
    </>
  );
};

export default ProductMain;
