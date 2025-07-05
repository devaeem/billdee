"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { IconCreditCard, IconPlus, IconTrash } from "@tabler/icons-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "หมายเลขบัตรต้องมี 16 หลัก" })
    .max(16, { message: "หมายเลขบัตรต้องมี 16 หลัก" }),
  cardName: z
    .string()
    .min(2, { message: "ชื่อบนบัตรต้องมีความยาวอย่างน้อย 2 ตัวอักษร" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "รูปแบบวันหมดอายุไม่ถูกต้อง (MM/YY)",
  }),
  cvv: z
    .string()
    .min(3, { message: "CVV ต้องมี 3 หลัก" })
    .max(3, { message: "CVV ต้องมี 3 หลัก" }),
  defaultPayment: z.string(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const savedCards = [
  {
    id: "1",
    cardNumber: "4111111111111111",
    cardName: "JOHN DOE",
    expiryDate: "12/25",
    type: "visa",
  },
  {
    id: "2",
    cardNumber: "5555555555554444",
    cardName: "JOHN DOE",
    expiryDate: "10/24",
    type: "mastercard",
  },
];

export function PaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      defaultPayment: "1",
    },
  });

  async function onSubmit(data: PaymentFormValues) {
    try {
      console.log(data);
      toast.success("บันทึกข้อมูลการชำระเงินเรียบร้อยแล้ว");
    } catch (error) {
      toast.error(`เกิดข้อผิดพลาดในการบันทึกข้อมูล ${error}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">บัตรที่บันทึกไว้</h3>
          <Button variant="outline" size="sm">
            <IconPlus className="size-4 mr-2" />
            เพิ่มบัตรใหม่
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="defaultPayment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4"
                    >
                      {savedCards.map((card) => (
                        <div key={card.id} className="relative">
                          <RadioGroupItem
                            value={card.id}
                            id={card.id}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={card.id}
                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="flex items-center gap-4">
                              <div className="size-12 rounded-lg border bg-card p-2">
                                <IconCreditCard className="size-full text-primary" />
                              </div>
                              <div className="grid gap-1">
                                <div className="font-medium">
                                  **** **** **** {card.cardNumber.slice(-4)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  หมดอายุ {card.expiryDate}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <IconTrash className="size-4 text-destructive" />
                            </Button>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">เพิ่มบัตรใหม่</h3>
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>หมายเลขบัตร</FormLabel>
                    <FormControl>
                      <Input placeholder="0000 0000 0000 0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อบนบัตร</FormLabel>
                    <FormControl>
                      <Input placeholder="JOHN DOE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>วันหมดอายุ</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">บันทึกบัตร</Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
