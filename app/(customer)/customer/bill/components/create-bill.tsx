"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  customerName: z.string().min(1, "กรุณากรอกชื่อลูกค้า"),
  phone: z.string(),
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

const CreateBill = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      items: [{ name: "", quantity: "", price: "", cost: "", total: "" }],
      note: "",
      subtotal: "0",
      discount: "0",
      total: "0",
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อลูกค้า</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เบอร์โทร</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 font-semibold">
              <div className="col-span-2">ชื่อสินค้า</div>
              <div>จำนวน/น้ำหนัก</div>
              <div>ราคาขาย/หน่วย</div>
              <div>ต้นทุน/หน่วย</div>
              <div>รวม (ราคาขาย)</div>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-6 gap-4 items-end">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemTotal(index);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemTotal(index);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.cost`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.total`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      ลบ
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    name: "",
                    quantity: "",
                    price: "",
                    cost: "",
                    total: "",
                  })
                }
              >
                + เพิ่มรายการ
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    name: "ไฟเล็ก",
                    quantity: "",
                    price: "",
                    cost: "",
                    total: "",
                  })
                }
              >
                + ไฟเล็ก
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    name: "ไฟกลาง",
                    quantity: "",
                    price: "",
                    cost: "",
                    total: "",
                  })
                }
              >
                + ไฟกลาง
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    name: "ไฟใหญ่",
                    quantity: "",
                    price: "",
                    cost: "",
                    total: "",
                  })
                }
              >
                + ไฟใหญ่
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    name: "ค่าส่ง",
                    quantity: "",
                    price: "",
                    cost: "",
                    total: "",
                  })
                }
              >
                + ค่าส่ง
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>หมายเหตุ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <div></div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="subtotal"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>ยอดรวม</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            readOnly
                            className="w-40 text-right"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>ส่วนลด</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="w-40 text-right"
                            onChange={(e) => {
                              field.onChange(e);
                              calculateTotal();
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>ยอดสุทธิ</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            readOnly
                            className="w-40 text-right"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            บันทึก
          </Button>
          <Button type="submit" variant="default">
            แสดงบิล
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBill;
