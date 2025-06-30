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
import { Receipt, User, Calendar, FileText, Plus, Phone } from "lucide-react";

// Define form validation schema
const billSchema = z.object({
  customerName: z.string().min(1, "กรุณากรอกชื่อลูกค้า"),
  phoneNumber: z.string().min(1, "กรุณากรอกเบอร์โทรศัพท์"),
  billDate: z.string().min(1, "กรุณาเลือกวันที่"),
  notes: z.string().optional(),
});

type BillFormValues = z.infer<typeof billSchema>;

interface Bill {
  id: string;
  customerName: string;
  phoneNumber: string;
  billDate: string;
  notes: string;
}

export function BillForm() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "BILL-001",
      customerName: "ลูกค้าตัวอย่าง 1",
      phoneNumber: "0812345678",
      billDate: "2024-03-20",
      notes: "บิลตัวอย่าง 1",
    },
  ]);

  const form = useForm<BillFormValues>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      customerName: "",
      phoneNumber: "",
      billDate: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  const onSubmit = (data: BillFormValues) => {
    const billId = `BILL-${(bills.length + 1).toString().padStart(3, "0")}`;

    setBills([
      ...bills,
      {
        id: billId,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        billDate: data.billDate,
        notes: data.notes || "",
      },
    ]);

    form.reset();
    toast.success("เพิ่มบิลสำเร็จ");
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg rounded-3xl overflow-hidden bg-white gap-3">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-center space-x-2">
            <Receipt className="w-8 h-8 text-orange-500" />
            <CardTitle>
              <h3 className="text-2xl font-semibold text-black">
                สร้างบิลใหม่
              </h3>
            </CardTitle>
          </div>
          <CardDescription>
            <p className="text-sm text-gray-500">
              กรอกข้อมูลลูกค้าเพื่อสร้างบิลใหม่
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <span>ชื่อลูกค้า</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="กรอกชื่อลูกค้า"
                            className="h-12 border rounded-2xl text-base focus:ring-2 focus:ring-red-500 pl-4 pr-10"
                            {...field}
                          />
                          <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <span>เบอร์โทรศัพท์</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="กรอกเบอร์โทรศัพท์"
                            className="h-12 border rounded-2xl text-base focus:ring-2 focus:ring-red-500 pl-4 pr-10"
                            {...field}
                          />
                          <Phone className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <span>วันที่</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-12 border rounded-2xl text-base focus:ring-2 focus:ring-red-500 pl-4 pr-10"
                            {...field}
                          />
                          <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <span>หมายเหตุ</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="กรอกหมายเหตุ (ไม่บังคับ)"
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
                className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>สร้างบิล</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
