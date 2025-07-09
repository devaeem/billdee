"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/custom-ui/modal/modal";

import Input from "@/components/custom-ui/input";
import { Control, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import ProductCard from "./ProductCard";
import { Product, products } from "../data/products";
import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete04Icon } from "@hugeicons/core-free-icons";
import { formSchema } from "./create-bill";
import { z } from "zod";

interface ProductListProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  fieldArray: UseFieldArrayReturn<z.infer<typeof formSchema>, "items", "id">;
  onItemTotalChange: (index: number) => void;
}

const ProductList = ({
  form,
  fieldArray,
  onItemTotalChange,
}: ProductListProps) => {
  const { fields, append, remove } = fieldArray;
  const filteredProducts = products.slice(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (lastAddedIndex !== null) {
      const input = inputRefs.current[lastAddedIndex];
      input?.focus();
      setLastAddedIndex(null);
    }
  }, [lastAddedIndex]);

  const handleAddProduct = (product: Product) => {
    append({
      name: product.name,
      quantity: "",
      price: "",
      cost: "",
      total: "",
    });
    setLastAddedIndex(fields.length);
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  console.log("fields", fields);

  return (
    <Card className="p-4 shadow-sm">
      <CardHeader>
        <CardTitle>รายการสินค้า</CardTitle>
        <CardDescription>เพิ่มรายการสินค้าที่ต้องการ</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[200px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClick={() => handleAddProduct(product)}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              เพิ่มรายการ
            </Button>

            <Modal
              title="เพิ่มรายการสินค้า"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product as Product}
                    onClick={() => {
                      handleAddProduct(product);
                      setIsModalOpen(false);
                    }}
                  />
                ))}
              </div>
            </Modal>
          </div>
        </ScrollArea>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-2 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>รายการสินค้า {index + 1}</CardTitle>
                <CardDescription>
                  รหัสสินค้า {field.name}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <HugeiconsIcon icon={Delete04Icon} size={20} />
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3">
                  <Input
                    label="ชื่อสินค้า"
                    // {...form.register(`items.${index}.name`)}
                    onChange={(e) => {
                      form.setValue(`items.${index}.name`, e.target.value);
                    }}
                    value={form.watch(`items.${index}.name`) || ""}
                    placeholder="ระบุชื่อสินค้า"
                  />
                  <Input
                    label="จำนวน"
                    // {...form.register(`items.${index}.quantity`, {
                    //   onChange: () => onItemTotalChange(index),
                    // })}
                    onChange={(e) => {
                      form.setValue(`items.${index}.quantity`, e.target.value);
                    }}
                    value={form.watch(`items.${index}.quantity`) || ""}
                    placeholder="ระบุจำนวน"
                  />
                  <Input
                    label="ราคา"
                    onChange={(e) => {
                      form.setValue(`items.${index}.price`, e.target.value);
                      onItemTotalChange(index);
                    }}
                    // {...form.register(`items.${index}.price`, {
                    //   onChange: () => onItemTotalChange(index),
                    // })}
                    value={form.watch(`items.${index}.price`) || ""}
                    placeholder="ระบุราคา"
                  />
                  <Input
                    label="ต้นทุน"
                    // {...form.register(`items.${index}.cost`)}
                    onChange={(e) => {
                      form.setValue(`items.${index}.cost`, e.target.value);
                      onItemTotalChange(index);
                    }}
                    value={form.watch(`items.${index}.cost`) || ""}
                    placeholder="ระบุต้นทุน"
                  />
                  <Input
                    label="ยอดรวม"
                    readOnly
                    value={form.watch(`items.${index}.total`) || ""}
                    placeholder="ระบุยอดรวม"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[200px] space-y-4">
            <img
              src="/store-empty.svg"
              alt="No products"
              className="w-32 h-32 opacity-50"
            />
            <div className="text-center">
              <p className="text-gray-500 font-medium">ยังไม่มีรายการสินค้า</p>
              <p className="text-sm text-gray-400">
                กรุณาเลือกสินค้าที่ต้องการเพิ่มในรายการ
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
