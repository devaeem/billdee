"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  image: string;
  totalPurchase: number;
  lastPurchase: string;
  status: "active" | "inactive";
  itemCount: number;
  code: string;
}

// Mock data - replace with real data later
const customers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    image: "/avatars/01.png",
    totalPurchase: 15000,
    lastPurchase: "2024-03-15",
    status: "active",
    itemCount: 5,
    code: "A4",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/avatars/02.png",
    totalPurchase: 12500,
    lastPurchase: "2024-03-14",
    status: "active",
    itemCount: 4,
    code: "B2",
  },
  {
    id: 3,
    name: "Mike Johnson",
    image: "/avatars/03.png",
    totalPurchase: 9800,
    lastPurchase: "2024-03-13",
    status: "inactive",
    itemCount: 6,
    code: "C1",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    image: "/avatars/04.png",
    totalPurchase: 15000,
    lastPurchase: "2024-03-15",
    status: "active",
    itemCount: 3,
    code: "D3",
  },
  {
    id: 5,
    name: "Alex Brown",
    image: "/avatars/05.png",
    totalPurchase: 15000,
    lastPurchase: "2024-03-15",
    status: "inactive",
    itemCount: 8,
    code: "E5",
  },
  // Add more mock data as needed
];

const CustomerBaseBuy = () => {
  return (
    <Card className="w-full bg-gradient-to-b from-card to-background border-none shadow-md">
      <CardHeader className="pb-3 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight">
              รายการลูกค้า
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              รายการลูกค้าทั้งหมดในระบบ
            </p>
          </div>
          <Badge
            variant="secondary"
            className="px-3 py-1 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-colors"
          >
            {customers.length} รายการ
          </Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground/70" />
          <Input
            placeholder="ค้นหารายการ"
            className="pl-8 text-sm h-9 bg-background/50 focus:bg-background transition-colors border-border/50 hover:border-border focus:border-ring"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center gap-3 px-6 py-4 hover:bg-muted/30 transition-all duration-200 group"
            >
              <div
                className={`
                flex-none w-10 h-10 rounded-xl 
                ${
                  customer.status === "active"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                } 
                flex items-center justify-center text-sm font-semibold
                group-hover:scale-105 transition-transform
              `}
              >
                {customer.code}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {customer.name}
                  </p>
                  <Badge
                    variant={
                      customer.status === "active" ? "default" : "secondary"
                    }
                    className={`
                      text-[10px] h-5 px-2 rounded-md
                      ${
                        customer.status === "active"
                          ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20"
                          : "bg-muted/50 hover:bg-muted/70"
                      }
                    `}
                  >
                    {customer.status === "active" ? "กำลังซื้อ" : "ไม่ได้ซื้อ"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground">
                    {customer.itemCount} รายการ
                  </p>
                  <span className="text-xs text-muted-foreground/50">•</span>
                  <p className="text-xs text-muted-foreground">
                    {new Date(customer.lastPurchase).toLocaleDateString(
                      "th-TH",
                      {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex-none">
                <p
                  className={`
                  text-sm font-medium tabular-nums
                  ${
                    customer.status === "active"
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  }
                `}
                >
                  ฿{customer.totalPurchase.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerBaseBuy;
