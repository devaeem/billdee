"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import BillPDF from "./bill-pdf";
import { pdf } from "@react-pdf/renderer";
import CustomerForm from "./CustomerForm";
import ProductList from "./ProductList";
import NoteSection from "./NoteSection";
import OrderSummary from "./OrderSummary";
import html2canvas from "html2canvas";

export const formSchema = z.object({
  customerName: z.string().min(1, "กรุณากรอกชื่อลูกค้า"),
  phone: z.string(),
  email: z.string().optional(),
  customerType: z.string().optional(),
  address: z.string().optional(),
  taxId: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
      quantity: z.string().min(1, "กรุณากรอกจำนวน"),
      price: z.string().min(1, "กรุณากรอกราคา"),
      cost: z.string().optional(),
      total: z.string(),
    })
  ),
  note: z.string().optional(),
  subtotal: z.string(),
  discount: z.string(),
  total: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

// Create dynamic import for PDFViewer
const PDFPreview = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            กำลังโหลด...
          </h1>
        </div>
      </div>
    ),
  }
);

const CreateBill = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      customerType: "retail",
      address: "",
      taxId: "",
      items: [],
      note: "",
      subtotal: "0",
      discount: "0",
      total: "0",
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const calculateItemTotal = (index: number) => {
    const quantity = parseFloat(form.watch(`items.${index}.quantity`) || "0");
    const price = parseFloat(form.watch(`items.${index}.price`) || "0");
    const total = quantity * price;
    form.setValue(`items.${index}.total`, total.toString());
    calculateSubtotal();
  };

  const calculateSubtotal = () => {
    const items = form.watch("items");
    const subtotal = items.reduce((acc, item) => {
      return acc + (parseFloat(item.total) || 0);
    }, 0);
    form.setValue("subtotal", subtotal.toString());
    calculateTotal();
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(form.watch("subtotal"));
    const discount = parseFloat(form.watch("discount") || "0");
    const total = subtotal - discount;
    form.setValue("total", total.toString());
  };

  const handleGeneratePDF = () => {
    const billData = {
      customerName: form.watch("customerName") || "",
      customerType: form.watch("customerType") || "",
      phone: form.watch("phone") || "",
      email: form.watch("email") || "",
      address: form.watch("address") || "",
      taxId: form.watch("taxId") || "",
      items: form.watch("items") || [],
      note: form.watch("note") || "",
      subtotal: form.watch("subtotal"),
      discount: form.watch("discount"),
      total: form.watch("total"),
    };

    handlePreviewBill();
  };

  const handlePreviewBill = async () => {
    const billData = {
      customerName: form.watch("customerName") || "",
      customerType: form.watch("customerType") || "",
      phone: form.watch("phone") || "",
      email: form.watch("email") || "",
      address: form.watch("address") || "",
      taxId: form.watch("taxId") || "",
      items: form.watch("items") || [],
      note: form.watch("note") || "",
      subtotal: form.watch("subtotal"),
      discount: form.watch("discount"),
      total: form.watch("total"),
    };

    try {
      const blob = await pdf(<BillPDF data={billData} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleDiscountClick = (percentage: number) => {
    const subtotal = parseFloat(form.watch("subtotal") || "0");
    form.setValue("discount", (subtotal * percentage).toString());
    calculateTotal();
  };

  const handleGenerateImage = async () => {
    const billData = {
      customerName: form.watch("customerName") || "",
      customerType: form.watch("customerType") || "",
      phone: form.watch("phone") || "",
      email: form.watch("email") || "",
      address: form.watch("address") || "",
      taxId: form.watch("taxId") || "",
      items: form.watch("items") || [],
      note: form.watch("note") || "",
      subtotal: form.watch("subtotal"),
      discount: form.watch("discount"),
      total: form.watch("total"),
    };

    try {
      // Create a temporary container for the PDF
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      // Render PDF content
      const pdfElement = <BillPDF data={billData} />;
      const root = document.createElement("div");
      container.appendChild(root);

      // Wait for PDF to render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Convert to canvas
      const canvas = await html2canvas(container, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });

      // Convert to image and download
      const imageUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `bill_${new Date().getTime()}.png`;
      link.href = imageUrl;
      link.click();

      // Cleanup
      document.body.removeChild(container);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">สร้างบิลใหม่</h1>
          <div className="flex gap-4">
            <Button type="button" variant="outline">
              บันทึกแบบร่าง
            </Button>
            <Button type="submit" variant="default" onClick={handleGeneratePDF}>
              สร้างบิล
            </Button>
            <Button
              type="submit"
              variant="default"
              onClick={handleGenerateImage}
            >
              เช็ครูป{" "}
            </Button>
            <Button
              disabled={!form.formState.isValid}
              type="button"
              variant="default"
              onClick={handlePreviewBill}
            >
              แสดงบิล
            </Button>
          </div>
        </div>

        <CustomerForm control={form.control} />

        <ProductList
          form={form}
          fieldArray={fieldArray}
          onItemTotalChange={calculateItemTotal}
        />

        <div className="grid grid-cols-2 gap-6">
          <NoteSection control={form.control} />
          <OrderSummary
            control={form.control}
            itemCount={fieldArray.fields.length}
            onDiscountClick={handleDiscountClick}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateBill;
