import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, CreditCard, QrCode, Printer } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderSummary() {
  const orderItems: OrderItem[] = [
    { id: "1", name: "Pasta with Roast Beef", quantity: 2, price: 20.0 },
    { id: "2", name: "Shrimp Rice Bowl", quantity: 2, price: 12.0 },
    { id: "3", name: "Apple Stuffed Pancake", quantity: 1, price: 35.0 },
    { id: "4", name: "Vegetable Shrimp", quantity: 1, price: 10.0 },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const donation = 1.0;
  const total = subtotal + tax + donation;

  return (
    <Card className="p-6 h-full ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Table No #04</h2>
          <p className="text-sm text-gray-500">Order #F0030</p>
        </div>
        <Badge variant="outline">2 People</Badge>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-4">Ordered Items</h3>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{item.quantity}x</span>
                <span>{item.name}</span>
              </div>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Donation for Palestine</span>
          <span>${donation.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>Total Payable</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Payment Method</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2">
            <Banknote className="h-4 w-4" /> Cash
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <CreditCard className="h-4 w-4" /> Card
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <QrCode className="h-4 w-4" /> Scan
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
            Place Order
          </Button>
        </div>
      </div>
    </Card>
  );
}
