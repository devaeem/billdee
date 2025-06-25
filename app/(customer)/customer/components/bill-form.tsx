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
import { pdf } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface BillItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

const dummyProducts = [
  {
    id: "PROD-001",
    name: "สินค้าตัวอย่าง 1",
    price: 1500,
    description: "รายละเอียดสินค้าตัวอย่าง 1",
    image: "/file.svg", // ใช้ไอคอนชั่วคราว คุณสามารถเปลี่ยนเป็นรูปสินค้าจริงได้
  },
  {
    id: "PROD-002",
    name: "สินค้าตัวอย่าง 2",
    price: 2500,
    description: "รายละเอียดสินค้าตัวอย่าง 2",
    image: "/file.svg",
  },
];

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "right",
  },
});

// PDF Document Component
const BillPDF = ({
  billItems,
  total,
}: {
  billItems: BillItem[];
  total: number;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>ใบเสร็จรับเงิน</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>รหัสสินค้า</Text>
            <Text style={styles.tableCell}>ชื่อสินค้า</Text>
            <Text style={styles.tableCell}>จำนวน</Text>
            <Text style={styles.tableCell}>ราคาต่อหน่วย</Text>
            <Text style={styles.tableCell}>รวม</Text>
          </View>
          {billItems.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCell}>{item.productId}</Text>
              <Text style={styles.tableCell}>{item.productName}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>
                ฿{item.price.toLocaleString()}
              </Text>
              <Text style={styles.tableCell}>
                ฿{item.total.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>
          ยอดรวมทั้งสิ้น: ฿{total.toLocaleString()}
        </Text>
      </View>
    </Page>
  </Document>
);

export function BillForm() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const product = dummyProducts.find((p) => p.id === selectedProduct);
    if (!product) return;

    const quantityNum = parseFloat(quantity);
    const total = product.price * quantityNum;

    setBillItems([
      ...billItems,
      {
        id: `ITEM-${billItems.length + 1}`,
        productId: product.id,
        productName: product.name,
        quantity: quantityNum,
        price: product.price,
        total,
      },
    ]);

    // Reset form
    setSelectedProduct(null);
    setQuantity("");
  };

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + item.total, 0);
  };

  const generatePDFPreview = async () => {
    try {
      setIsGeneratingPDF(true);
      const blob = await pdf(
        <BillPDF billItems={billItems} total={calculateTotal()} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfPreviewUrl(url);
      setShowPreview(true);
    } catch (error) {
      console.error("Error generating PDF preview:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfPreviewUrl) {
      const link = document.createElement("a");
      link.href = pdfPreviewUrl;
      link.download = "bill.pdf";
      link.click();
      // Clean up
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
      setShowPreview(false);
    }
  };

  // Clean up URL when dialog closes
  const handleClosePreview = () => {
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
    setShowPreview(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">สร้างบิลใหม่</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {dummyProducts.map((product) => (
            <Card
              key={product.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedProduct === product.id
                  ? "ring-2 ring-primary"
                  : "hover:ring-1 hover:ring-primary/50"
              }`}
              onClick={() => setSelectedProduct(product.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    ฿{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">จำนวน</Label>
            <div className="flex gap-2">
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                disabled={!selectedProduct}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!selectedProduct || !quantity}
                className="min-w-[120px]"
              >
                เพิ่มรายการ
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">รายการในบิล</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัสสินค้า</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead>จำนวน</TableHead>
              <TableHead>ราคาต่อหน่วย</TableHead>
              <TableHead>รวม</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>฿{item.price.toLocaleString()}</TableCell>
                <TableCell>฿{item.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-semibold">
            ยอดรวมทั้งสิ้น: ฿{calculateTotal().toLocaleString()}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={generatePDFPreview}
              disabled={isGeneratingPDF || billItems.length === 0}
              className="flex items-center gap-2"
            >
              <Image src="/file.svg" alt="Preview" width={20} height={20} />
              {isGeneratingPDF ? "กำลังสร้าง PDF..." : "พรีวิว PDF"}
            </Button>
            <Button
              onClick={() => {
                // Here you would typically save the bill to your backend
                alert("บันทึกบิลเรียบร้อย");
                setBillItems([]);
              }}
              disabled={billItems.length === 0}
            >
              บันทึกบิล
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={showPreview} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>พรีวิว PDF</DialogTitle>
          </DialogHeader>
          {pdfPreviewUrl && (
            <div className="flex-1 w-full h-full min-h-[60vh]">
              <iframe
                src={pdfPreviewUrl}
                className="w-full h-full rounded-md"
                title="PDF Preview"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleClosePreview}>
              ยกเลิก
            </Button>
            <Button onClick={handleDownloadPDF}>ดาวน์โหลด PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
