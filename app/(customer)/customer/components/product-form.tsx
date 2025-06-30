"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Package2,
  BadgeDollarSign,
  Package,
  FileText,
  Plus,
} from "lucide-react";

// Define form validation schema
const productSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
  price: z.coerce.number().min(0, "ราคาต้องมากกว่าหรือเท่ากับ 0"),
  unit: z.string().min(1, "กรุณากรอกหน่วย"),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export function ProductForm() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD-001",
      name: "สินค้าตัวอย่าง 1",
      price: 1500,
      unit: "ชิ้น",
      description: "รายละเอียดสินค้าตัวอย่าง 1",
    },
    {
      id: "PROD-002",
      name: "สินค้าตัวอย่าง 2",
      price: 2500,
      unit: "ชุด",
      description: "รายละเอียดสินค้าตัวอย่าง 2",
    },
  ]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      unit: "",
      description: "",
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    const productId = `PROD-${(products.length + 1)
      .toString()
      .padStart(3, "0")}`;

    setProducts([
      ...products,
      {
        id: productId,
        name: data.name,
        price: data.price,
        unit: data.unit,
        description: data.description || "",
      },
    ]);

    form.reset();
    toast.success("เพิ่มสินค้าสำเร็จ");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Package2 className="w-8 h-8 text-orange-500" />
        <CardTitle>
          <h3 className="text-2xl font-semibold text-black">เพิ่มสินค้าใหม่</h3>
        </CardTitle>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                    <span>ชื่อสินค้า</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="กรอกชื่อสินค้า"
                        className="h-12 border rounded-2xl text-base focus:ring-2 focus:ring-red-500 pl-4 pr-10"
                        {...field}
                      />
                      <Package className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                    <span>ราคา</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="กรอกราคา"
                        className="h-12 border rounded-2xl text-base focus:ring-2 focus:ring-red-500 pl-4 pr-10"
                        {...field}
                      />
                      <BadgeDollarSign className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                    <span>หน่วย</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="กรอกหน่วย"
                        className="h-12 border rounded-2xl text-base focus:ring-2 focus:ring-red-500 pl-4 pr-10"
                        {...field}
                      />
                      <Package2 className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                    <span>รายละเอียด</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="กรอกรายละเอียด (ไม่บังคับ)"
                        className="min-h-[120px] border rounded-2xl text-base focus:ring-2 focus:ring-red-500 resize-none p-4 pr-10"
                        {...field}
                      />
                      <FileText className="w-5 h-5 text-gray-400 absolute right-3 top-4" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>เพิ่มสินค้า</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
