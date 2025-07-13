"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import Input from "@/components/custom-ui/input";
import { DatePicker } from "@/components/custom-ui/date-inpput";
import Autocomplete from "@/components/custom-ui/autocomplete";
import Btn from "@/components/custom-ui/btn";
import { Modal } from "@/components/custom-ui/modal/modal";
import ProductItemsForm from "./product-items-form";

interface BillItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
  cost: number;
}

interface BillFormData {
  billNumber: string;
  date: string;
  customerName: string;
  phoneNumber: string;
  items: BillItem[];
  total: number;
  discount: number;
  netTotal: number;
  note: string;
}

export default function CreateBill() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [createCustomer, setCreateCustomer] = useState(false);
  const [billNumber, setBillNumber] = useState("");

  const { register, handleSubmit, watch, setValue, control } =
    useForm<BillFormData>({
      defaultValues: {
        billNumber: "",
        date: new Date().toISOString().split("T")[0],
        customerName: "",
        phoneNumber: "",
        items: [
          {
            name: "",
            quantity: 0,
            pricePerUnit: 0,
            cost: 0,
          },
        ],
        total: 0,
        discount: 0,
        netTotal: 0,
        note: "",
      },
    });

  useEffect(() => {
    // ดึงค่าจาก localStorage
    const existingBillNumber = localStorage.getItem("lastBillNumber");

    if (existingBillNumber) {
      // ถ้ามีค่าอยู่แล้ว ให้เพิ่มเลขท้าย
      const currentNumber = parseInt(existingBillNumber.slice(-3));
      const newNumber = (currentNumber + 1).toString().padStart(3, "0");
      const newBillNumber = `${existingBillNumber.slice(0, -3)}${newNumber}`;
      localStorage.setItem("lastBillNumber", newBillNumber);
      setBillNumber(newBillNumber);
      setValue("billNumber", newBillNumber);
    } else {
      // ถ้ายังไม่มีค่า สร้างใหม่
      const today = new Date();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const year = today.getFullYear().toString().slice(-2);
      const hours = today.getHours().toString().padStart(2, "0");
      const minutes = today.getMinutes().toString().padStart(2, "0");

      const newBillNumber = `B${month}${day}${year}${hours}${minutes}001`;
      localStorage.setItem("lastBillNumber", newBillNumber);
      setBillNumber(newBillNumber);
      setValue("billNumber", newBillNumber);
    }
  }, []); // เรียกใช้เฉพาะครั้งแรกที่ component mount

  const onSubmit = (data: BillFormData) => {
    console.log(data);
  };

  const stores = [
    { label: "ร้านรุ่งเรืองพาณิชย์", value: "1" },
    { label: "ร้านโชคชัยมาร์เก็ต", value: "2" },
    { label: "ร้านใบเฟิร์นมินิมาร์ท", value: "3" },
    { label: "ร้านสมใจค้าไม้", value: "4" },
    { label: "ร้านมะลิสดพลาซ่า", value: "5" },
    { label: "ร้านบ้านขนมไทย", value: "6" },
    { label: "ร้านต้นกล้าซุปเปอร์", value: "7" },
    { label: "ร้านบัวหลวงสโตร์", value: "8" },
    { label: "ร้านนารายณ์เทรดดิ้ง", value: "9" },
    { label: "ร้านโอ่งเงินเซ็นเตอร์", value: "10" },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">สร้างบิลขาย</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            สร้างบิลขายใหม่ {billNumber}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="เลขที่บิล"
              placeholder="ระบุเลขที่บิล"
              {...register("billNumber")}
              className="cursor-not-allowed bg-slate-200"
              disabled
            />
            <DatePicker />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Autocomplete
              label="ชื่อลูกค้า"
              placeholder="ระบุชื่อลูกค้า"
              {...register("customerName")}
              className="w-full"
              value={watch("customerName")}
              onValueChange={(value) => {
                setValue("customerName", value);
              }}
              empty={
                <div className="flex flex-col gap-2 justify-center items-center">
                  ไม่พบข้อมูล กรุณาระบุชื่อลูกค้า หรือสร้างลูกค้าใหม่
                  <Btn
                    onClick={() => {
                      setCreateCustomer(true);
                    }}
                    variant="outline"
                  >
                    สร้างลูกค้าใหม่
                  </Btn>
                </div>
              }
              options={stores}
            />
            <Input
              label="เบอร์โทรลูกค้า"
              placeholder="ระบุเบอร์โทรลูกค้า"
              {...register("phoneNumber")}
            />
          </div>
          <ProductItemsForm
            control={control}
            register={register}
            watch={watch}
            setValue={setValue}
          />
        </CardContent>
      </Card>
      <Modal
        isOpen={createCustomer}
        onClose={() => setCreateCustomer(false)}
        title="สร้างลูกค้าใหม่"
      >
        <div>สร้างลูกค้าใหม่</div>
      </Modal>
    </>
  );
}
