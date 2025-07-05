"use client";
import React from "react";
// import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Btn from "@/components/custom-ui/btn";
import Input from "@/components/custom-ui/input";

// const formSchema = z.object({
//   description: z.string().min(1, "กรุณากรอกรายละเอียด"),
//   category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
//   amount: z.string().min(1, "กรุณากรอกจำนวนเงิน"),
//   date: z.string().min(1, "กรุณาเลือกวันที่"),
//   note: z.string().optional(),
//   status: z.string().min(1, "กรุณาเลือกสถานะ"),
// });

// type FormValues = z.infer<typeof formSchema>;

// const expenseCategories = [
//   { value: "วัตถุดิบ", label: "วัตถุดิบ" },
//   { value: "ขนส่ง", label: "ขนส่ง" },
//   { value: "เครื่องมือ", label: "เครื่องมือ" },
//   { value: "ค่าน้ำ", label: "ค่าน้ำ" },
//   { value: "ค่าไฟ", label: "ค่าไฟ" },
//   { value: "ค่าเช่า", label: "ค่าเช่า" },
//   { value: "อื่นๆ", label: "อื่นๆ" },
// ];

// const expenseStatuses = [
//   { value: "จ่ายแล้ว", label: "จ่ายแล้ว" },
//   { value: "ค้างจ่าย", label: "ค้างจ่าย" },
// ];

const CreateExpense = () => {
  // const form = useForm<FormValues>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     description: "",
  //     category: "",
  //     amount: "",
  //     date: new Date().toISOString().split("T")[0],
  //     note: "",
  //     status: "",
  //   },
  // });

  // const onSubmit = (values: FormValues) => {
  //   console.log(values);
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>บันทึกค่าใช้จ่ายใหม่</CardTitle>
        <CardDescription>กรอกข้อมูลค่าใช้จ่ายที่ต้องการบันทึก</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="รายละเอียด" placeholder="กรอกรายละเอียด" />
          <Input label="หมวดหมู่" placeholder="กรอกหมวดหมู่" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="จำนวนเงิน" placeholder="กรอกจำนวนเงิน" />
          <Input label="วันที่" placeholder="กรอกวันที่" />
        </div>

        <div className="flex justify-self-start gap-2">
          <Btn type="submit">บันทึก</Btn>
          <Btn variant="outline">ยกเลิก</Btn>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateExpense;
