"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  isPopular?: boolean;
}

export default function MenuItems() {
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Grilled Salmon Steak",
      category: "Lunch",
      price: 15.0,
      image:
        "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=1000",
      quantity: 0,
      isPopular: true,
    },
    {
      id: "2",
      name: "Tofu Poke Bowl",
      category: "Salad",
      price: 7.0,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
      quantity: 0,
    },
    {
      id: "3",
      name: "Pasta with Roast Beef",
      category: "Pasta",
      price: 10.0,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000",
      quantity: 2,
      isPopular: true,
    },
    {
      id: "4",
      name: "Beef Steak",
      category: "Beef",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000",
      quantity: 0,
    },
    {
      id: "5",
      name: "Shrimp Rice Bowl",
      category: "Rice",
      price: 6.0,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000",
      quantity: 2,
    },
    {
      id: "6",
      name: "Apple Stuffed Pancake",
      category: "Dessert",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000",
      quantity: 1,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {menuItems.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "overflow-hidden group relative cursor-pointer h-48",
            item.quantity > 0 && "ring-2 ring-orange-500 ring-opacity-50"
          )}
        >
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/store-empty.svg";
            }}
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="p-4 text-white h-full flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                <span className="text-sm text-gray-300">{item.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${item.price.toFixed(2)}
                </span>
                {item.quantity > 0 && (
                  <Badge className="bg-orange-500 border-none">
                    Qty: {item.quantity}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {item.isPopular && (
            <Badge className="absolute top-2 right-2 bg-orange-500 text-white border-none shadow-lg z-10">
              Popular
            </Badge>
          )}
        </Card>
      ))}
    </div>
  );
}
