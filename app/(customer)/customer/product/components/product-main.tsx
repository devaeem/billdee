"use client";
import Paginations from "@/components/custom-ui/pagination";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import ProductFilter from "./product-flter";
import ProductModal from "./modal/product-modal";

interface Product {
  product_name: string;
}

const ProductMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const columns: ColumnDef<Product>[] = [
    {
      header: "ชื่อสินค้า",
      accessorKey: "product_name",
    },
  ];

  const data: Product[] = [
    {
      product_name: "สินค้า 1",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">รายการสินค้า</h1>
        </div>

        {/* product fiilter */}
        <ProductFilter setIsOpen={setIsOpen} />

        <DataTable data={data} columns={columns} />
        <Paginations
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
      <ProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ProductMain;
