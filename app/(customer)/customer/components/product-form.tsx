"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export function ProductForm() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD-001",
      name: "สินค้าตัวอย่าง 1",
      price: 1500,
      unit: "ชิ้น",
      description: "รายละเอียดสินค้าตัวอย่าง 1",
    },
    {
      id: "PROD-002",
      name: "สินค้าตัวอย่าง 2",
      price: 2500,
      unit: "ชุด",
      description: "รายละเอียดสินค้าตัวอย่าง 2",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productId = `PROD-${(products.length + 1)
      .toString()
      .padStart(3, "0")}`;

    setProducts([
      ...products,
      {
        id: productId,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        description: newProduct.description,
      },
    ]);

    setNewProduct({
      name: "",
      price: "",
      unit: "",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">เพิ่มสินค้าใหม่</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อสินค้า</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">ราคา</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">หน่วย</Label>
              <Input
                id="unit"
                value={newProduct.unit}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, unit: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">รายละเอียด</Label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            เพิ่มสินค้า
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">รายการสินค้า</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัสสินค้า</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead>ราคา</TableHead>
              <TableHead>หน่วย</TableHead>
              <TableHead>รายละเอียด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>฿{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
