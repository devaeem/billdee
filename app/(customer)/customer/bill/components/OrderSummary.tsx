"use client";

import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Input from "@/components/custom-ui/input";
import { Control } from "react-hook-form";
import { formSchema } from "./create-bill";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

interface OrderSummaryProps {
  control: Control<FormValues>;
  itemCount: number;
  onDiscountClick: (percentage: number) => void;
}

const OrderSummary = ({
  control,
  itemCount,
  onDiscountClick,
}: OrderSummaryProps) => {
  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">สรุปยอด</h2>
        <div className="text-sm text-gray-500">
          รายการทั้งหมด: {itemCount} รายการ
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <FormField
            control={control}
            name="subtotal"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <div>
                    <FormLabel className="text-gray-600 font-normal">
                      ยอดรวม
                    </FormLabel>
                    <p className="text-xs text-gray-500">
                      ราคารวมก่อนหักส่วนลด
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="w-40 text-right bg-white font-medium border-0 text-lg"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <div>
                    <FormLabel className="text-gray-600 font-normal">
                      ส่วนลด
                    </FormLabel>
                    <p className="text-xs text-gray-500">ระบุจำนวนเงินส่วนลด</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => onDiscountClick(0.05)}
                    >
                      5%
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => onDiscountClick(0.1)}
                    >
                      10%
                    </Button>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        className="w-40 text-right bg-white"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <FormField
            control={control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <div>
                    <FormLabel className="text-lg font-medium text-blue-900">
                      ยอดสุทธิ
                    </FormLabel>
                    <p className="text-sm text-blue-600">
                      ราคารวมหลังหักส่วนลด
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="w-48 text-right bg-white border-0 text-2xl font-bold text-blue-700"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;
