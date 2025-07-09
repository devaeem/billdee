import { ReactNode } from "react";

export interface Product {
  name: string;
  color: string;
}

export const products: Product[] = [
  {
    name: "ไฟเล็ก",

    color: "blue",
  },
  {
    name: "ไฟกลาง",

    color: "yellow",
  },
  {
    name: "ไฟใหญ่",

    color: "orange",
  },
  {
    name: "ค่าส่ง",

    color: "green",
  },
  {
    name: "ค่าติดตั้ง",

    color: "purple",
  },
  {
    name: "อุปกรณ์เสริม",

    color: "red",
  },
  {
    name: "ปลั๊กไฟ",

    color: "slate",
  },
  {
    name: "สวิตช์",

    color: "emerald",
  },
  {
    name: "เบรกเกอร์",

    color: "cyan",
  },
  {
    name: "ตู้ควบคุม",

    color: "indigo",
  },
];
