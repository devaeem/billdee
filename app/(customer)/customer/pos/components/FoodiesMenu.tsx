import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  UtensilsCrossed,
  Star,
  Soup,
  Cake,
  Drumstick,
  Coffee,
  Salad,
  Fish,
  Pizza,
  Sandwich,
} from "lucide-react";

interface MenuCategory {
  name: string;
  icon: React.ReactNode;
  items: number;
  isSpecial?: boolean;
}

export default function FoodiesMenu() {
  const categories: MenuCategory[] = [
    {
      name: "All Menu",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      items: 154,
    },
    {
      name: "Special",
      icon: <Star className="w-6 h-6" />,
      items: 17,
      isSpecial: true,
    },
    { name: "Soups", icon: <Soup className="w-6 h-6" />, items: 3 },
    { name: "Desserts", icon: <Cake className="w-6 h-6" />, items: 19 },
    { name: "Chickens", icon: <Drumstick className="w-6 h-6" />, items: 10 },
    { name: "Drinks", icon: <Coffee className="w-6 h-6" />, items: 12 },
    { name: "Salads", icon: <Salad className="w-6 h-6" />, items: 8 },
    { name: "Seafood", icon: <Fish className="w-6 h-6" />, items: 15 },
    { name: "Pizza", icon: <Pizza className="w-6 h-6" />, items: 9 },
    { name: "Burgers", icon: <Sandwich className="w-6 h-6" />, items: 7 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Foodies Menu</h2>
        <Button
          variant="outline"
          size="sm"
          className="text-orange-500 border-orange-200 hover:bg-orange-50"
        >
          View All
        </Button>
      </div>
      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.isSpecial ? "default" : "outline"}
              className={cn(
                "flex items-center space-x-2 px-4 py-6 rounded-xl transition-all duration-200",
                category.isSpecial
                  ? "bg-orange-500 hover:bg-orange-600 shadow-orange-100/50 shadow-lg"
                  : "hover:border-orange-200 hover:bg-orange-50/50"
              )}
            >
              {category.icon}
              <div className="flex flex-col items-start">
                <span className="font-medium">{category.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {category.items} items
                </span>
              </div>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </div>
  );
}
