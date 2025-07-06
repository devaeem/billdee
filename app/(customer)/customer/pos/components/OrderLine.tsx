import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OrderItemProps {
  orderNumber: string;
  tableNumber: string;
  items: number;
  status: "In Kitchen" | "Wait List" | "Ready";
  time: string;
}

const OrderItem = ({
  orderNumber,
  tableNumber,
  items,
  status,
  time,
}: OrderItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Kitchen":
        return "bg-emerald-500 shadow-emerald-100";
      case "Wait List":
        return "bg-orange-500 shadow-orange-100";
      case "Ready":
        return "bg-purple-500 shadow-purple-100";
      default:
        return "bg-gray-500 shadow-gray-100";
    }
  };

  return (
    <div className="flex-shrink-0 w-[280px] p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">#{orderNumber}</span>
          <Badge variant="outline" className="bg-gray-50">
            Table {tableNumber}
          </Badge>
        </div>
        <Badge className={cn(getStatusColor(status), "text-white shadow-sm")}>
          {status}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-medium">{items}X Items</span>
        </div>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
    </div>
  );
};

export default function OrderLine() {
  const orderStatuses = [
    { type: "All", count: 8, color: "bg-blue-500 shadow-blue-100", icon: "🔄" },
    {
      type: "Dine in",
      count: 4,
      color: "bg-green-500 shadow-green-100",
      icon: "🪑",
    },
    {
      type: "Wait List",
      count: 10,
      color: "bg-orange-500 shadow-orange-100",
      icon: "⏳",
    },
    {
      type: "Take Away",
      count: 2,
      color: "bg-purple-500 shadow-purple-100",
      icon: "🥡",
    },
    {
      type: "Served",
      count: 7,
      color: "bg-emerald-500 shadow-emerald-100",
      icon: "✅",
    },
  ];

  const orders = [
    {
      orderNumber: "F0027",
      tableNumber: "03",
      items: 8,
      status: "In Kitchen" as const,
      time: "2 mins ago",
    },
    {
      orderNumber: "F0028",
      tableNumber: "07",
      items: 3,
      status: "Wait List" as const,
      time: "Just Now",
    },
    {
      orderNumber: "F0019",
      tableNumber: "09",
      items: 2,
      status: "Ready" as const,
      time: "25 mins ago",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {orderStatuses.map((status) => (
          <button
            key={status.type}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-xl">{status.icon}</span>
            <span className="font-medium">{status.type}</span>
            <Badge className={cn(status.color, "text-white shadow-sm ml-1")}>
              {status.count}
            </Badge>
          </button>
        ))}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {orders.map((order) => (
          <OrderItem key={order.orderNumber} {...order} />
        ))}
      </div>
    </div>
  );
}
