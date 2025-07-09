"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import Input from "@/components/custom-ui/input";
import { Control } from "react-hook-form";
import Select from "@/components/custom-ui/select";
import { formSchema } from "./create-bill";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

interface CustomerFormProps {
  control: Control<FormValues>;
}

const CustomerForm = ({ control }: CustomerFormProps) => {
  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-center justify-between ">
        <div>
          <h2 className="text-lg font-medium">ข้อมูลลูกค้า</h2>
          <p className="text-sm text-gray-500 mt-1">
            กรอกข้อมูลลูกค้าสำหรับออกบิล
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ชื่อลูกค้า <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ระบุชื่อลูกค้า"
                    className="bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="customerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ประเภทลูกค้า</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  options={[
                    { label: "ลูกค้าทั่วไป", value: "retail" },
                    { label: "ลูกค้าขายส่ง", value: "wholesale" },
                    { label: "ลูกค้า VIP", value: "vip" },
                  ]}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="0x-xxxx-xxxx"
                    className="bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>อีเมล</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="example@email.com"
                    className="bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เลขประจำตัวผู้เสียภาษี</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="0-0000-00000-00-0"
                    className="bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="ระบุที่อยู่สำหรับการจัดส่ง"
                  className="bg-white focus:ring-2 focus:ring-blue-100 min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};

export default CustomerForm;
