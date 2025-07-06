"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Product = {
  id: number;
  name: string;
  quantity: number;
  revenue: number;
  image: string;
  rank: number;
};

// Mock data - replace with real data later
const mockProducts: Product[] = [
  {
    id: 1,
    name: "สินค้า A",
    quantity: 150,
    revenue: 15000,
    image: "https://picsum.photos/200",
    rank: 1,
  },
  {
    id: 2,
    name: "สินค้า B",
    quantity: 120,
    revenue: 12000,
    image: "https://picsum.photos/201",
    rank: 2,
  },
  {
    id: 3,
    name: "สินค้า C",
    quantity: 100,
    revenue: 10000,
    image: "https://picsum.photos/202",
    rank: 3,
  },
  {
    id: 4,
    name: "สินค้า D",
    quantity: 80,
    revenue: 8000,
    image: "https://picsum.photos/203",
    rank: 4,
  },
  {
    id: 5,
    name: "สินค้า E",
    quantity: 60,
    revenue: 6000,
    image: "https://picsum.photos/204",
    rank: 5,
  },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-500 text-white";
    case 2:
      return "bg-slate-400 text-white";
    case 3:
      return "bg-amber-700 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const ProductBaseSale = () => {
  return (
    <Card className="w-full bg-gradient-to-b from-card to-background border-none shadow-md">
      <CardHeader className="pb-3 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight">
              สินค้าขายดี
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              5 อันดับสินค้าที่ขายดีที่สุดประจำเดือน
            </p>
          </div>
          <Badge
            variant="secondary"
            className="px-3 py-1 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-colors"
          >
            {mockProducts.length} รายการ
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
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 px-6 py-4 hover:bg-muted/30 transition-all duration-200 group"
            >
              <Badge
                className={`flex-none w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${getRankColor(
                  product.rank
                )} group-hover:scale-105 transition-transform`}
              >
                {product.rank}
              </Badge>
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-[10px] h-5 px-2 rounded-md bg-muted/50 hover:bg-muted/70"
                  >
                    {product.quantity.toLocaleString()} ชิ้น
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground">
                    ยอดขาย ฿{product.revenue.toLocaleString()}
                  </p>
                  <span className="text-xs text-muted-foreground/50">•</span>
                  <p className="text-xs text-muted-foreground">
                    อันดับที่ {product.rank}
                  </p>
                </div>
              </div>
              <div className="flex-none">
                <p className="text-sm font-medium tabular-nums text-emerald-600">
                  ฿{product.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBaseSale;
