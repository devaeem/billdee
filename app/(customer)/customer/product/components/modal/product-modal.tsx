"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Input from "@/components/custom-ui/input";
import { ModalForm } from "@/components/custom-ui/modal/modal-from";
import { Textarea } from "@/components/custom-ui/textarea";
import ModeView from "@/components/custom-ui/mode-view";
interface ProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mode: "create" | "edit" | "view" | "";
}

const productSchema = z.object({
  product_name: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
  price: z.coerce.number({ message: "กรุณากรอกราคา" }),
  price_sale: z.coerce.number({ message: "กรุณากรอกราคาต้นทุน" }),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductModal = ({
  isOpen,
  setIsOpen,
  mode = "create",
}: ProductModalProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      price: undefined,
      price_sale: undefined,
      description: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log("data-product", data);
  };

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      form.setValue("product_name", "สินค้า 1");
      form.setValue("price", 100);
      form.setValue("price_sale", 90);
      form.setValue("description", "รายละเอียดสินค้า 1");
    }
  }, [mode, form]);

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        form.reset({
          product_name: "",
          price: undefined,
          price_sale: undefined,
          description: "",
        });
      }}
      title={
        mode === "create"
          ? "เพิ่มสินค้า"
          : mode === "edit"
          ? `แก้ไขสินค้า ${form.watch("product_name")}`
          : `ดูรายละเอียดสินค้า ${form.watch("product_name")}`
      }
      onSubmit={onSubmit}
      methods={form}
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
        {mode === "view" ? (
          <ModeView value={form.watch("product_name")} title="ชื่อสินค้า" />
        ) : (
          <Input
            label="ชื่อสินค้า"
            required
            placeholder="กรอกชื่อสินค้า"
            value={form.watch("product_name")}
            error={form.formState.errors.product_name?.message}
            onChange={(e) => {
              form.setValue("product_name", e.target.value, {
                shouldValidate: true,
              });
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {mode === "view" ? (
          <>
            <ModeView
              value={form.watch("price")?.toString() || ""}
              title="ราคา"
            />
            <ModeView
              value={form.watch("price_sale")?.toString() || ""}
              title="ราคาต้นทุน"
            />
          </>
        ) : (
          <>
            <Input
              label="ราคา"
              required
              placeholder="กรอกราคา"
              value={form.watch("price") || ""}
              error={form.formState.errors.price?.message}
              onChange={(e) => {
                form.setValue("price", Number(e.target.value), {
                  shouldValidate: true,
                });
              }}
            />
            <Input
              label="ราคาต้นทุน"
              required
              placeholder="กรอกราคาต้นทุน"
              value={form.watch("price_sale") || ""}
              error={form.formState.errors.price_sale?.message}
              onChange={(e) => {
                form.setValue("price_sale", Number(e.target.value), {
                  shouldValidate: true,
                });
              }}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
        {mode === "view" ? (
          <ModeView
            value={form.watch("description") || ""}
            title="รายละเอียด"
          />
        ) : (
          <Textarea
            label="รายละเอียด"
            placeholder="กรอกรายละเอียด"
            value={form.watch("description")}
            error={form.formState.errors.description?.message}
            onChange={(e) => {
              form.setValue("description", e.target.value, {
                shouldValidate: true,
              });
            }}
          />
        )}
      </div>
    </ModalForm>
  );
};

export default ProductModal;
