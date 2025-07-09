"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { th } from "date-fns/locale";

// Register Sarabun font as a fallback for better Thai support
Font.register({
  family: "Sarabun",
  src: "https://fonts.gstatic.com/s/sarabun/v13/DtVmJx26TKEr37c9YOZqulw.ttf",
});

// สร้าง Styles สำหรับ PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Sarabun",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#000000",
    paddingBottom: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Sarabun",
  },
  companyInfo: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 3,
    fontFamily: "Sarabun",
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Sarabun",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  customerInfo: {
    marginBottom: 20,
  },
  customerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Sarabun",
  },
  customerDetail: {
    fontSize: 10,
    marginBottom: 3,
    fontFamily: "Sarabun",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
  },
  tableHeader: {
    backgroundColor: "#F0F0F0",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000000",
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    fontFamily: "Sarabun",
  },
  summarySection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  summaryLabel: {
    width: 100,
    textAlign: "right",
    paddingRight: 10,
    fontSize: 10,
    fontFamily: "Sarabun",
  },
  summaryValue: {
    width: 100,
    textAlign: "right",
    fontSize: 10,
    fontFamily: "Sarabun",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
    borderTopWidth: 1,
    paddingTop: 5,
  },
  note: {
    marginTop: 30,
    fontSize: 10,
    color: "#666666",
    fontFamily: "Sarabun",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#666666",
    fontFamily: "Sarabun",
  },
});

interface BillItem {
  name: string;
  quantity: string;
  price: string;
  total: string;
}

interface BillData {
  customerName: string;
  customerType: string;
  phone: string;
  email: string;
  address: string;
  taxId: string;
  items: BillItem[];
  note: string;
  subtotal: string;
  discount: string;
  total: string;
}

interface BillPDFProps {
  data: BillData;
}

const BillPDF: React.FC<BillPDFProps> = ({ data }) => {
  const currentDate = format(new Date(), "dd MMMM yyyy", { locale: th });
  const billNumber = `BILL${format(new Date(), "yyyyMMddHHmmss")}`;
  const size = "A4";

  console.log(data);
  const MOCK_SHOP_INFO = {
    name: "FUNYdev co.,ltd",
    address: "123 ถนนสาธร, แขวงสาธร, เขตสาธร, กรุงเทพฯ 99999",
    phone: "081-234-5678",
    email: "funydev@gmail.com",
    taxId: "0105556000001",
  };

  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* ส่วนหัว */}
        <View style={styles.header}>
          <Text style={styles.companyName}>{MOCK_SHOP_INFO.name}</Text>
          <Text style={styles.companyInfo}>{MOCK_SHOP_INFO.address}</Text>
          <Text style={styles.companyInfo}>
            โทร: {MOCK_SHOP_INFO.phone}, Email: {MOCK_SHOP_INFO.email}
          </Text>
          <Text style={styles.companyInfo}>
            เลขประจำตัวผู้เสียภาษี: {MOCK_SHOP_INFO.taxId}
          </Text>
        </View>

        <Text style={styles.documentTitle}>ใบเสร็จรับเงิน / ใบกำกับภาษี</Text>

        {/* ข้อมูลเอกสาร */}
        <View
          style={[
            styles.section,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View>
            <Text style={styles.customerTitle}>ข้อมูลลูกค้า:</Text>
            <Text style={styles.customerDetail}>ชื่อ: {data.customerName}</Text>
            <Text style={styles.customerDetail}>
              ประเภท: {data.customerType}
            </Text>
            <Text style={styles.customerDetail}>โทร: {data.phone}</Text>
            <Text style={styles.customerDetail}>อีเมล: {data.email}</Text>
            <Text style={styles.customerDetail}>ที่อยู่: {data.address}</Text>
            {data.taxId && (
              <Text style={styles.customerDetail}>
                เลขประจำตัวผู้เสียภาษี: {data.taxId}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.customerDetail}>เลขที่: {billNumber}</Text>
            <Text style={styles.customerDetail}>วันที่: {currentDate}</Text>
          </View>
        </View>

        {/* ตารางรายการสินค้า */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text style={styles.tableCell}>รายการ</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>จำนวน</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>ราคา/หน่วย</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>รวม</Text>
            </View>
          </View>

          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCol, { width: "40%" }]}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
              <View style={[styles.tableCol, { width: "20%" }]}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={[styles.tableCol, { width: "20%" }]}>
                <Text style={styles.tableCell}>{item.price}</Text>
              </View>
              <View style={[styles.tableCol, { width: "20%" }]}>
                <Text style={styles.tableCell}>{item.total}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* สรุปยอด */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>ยอดรวม:</Text>
            <Text style={styles.summaryValue}>{data.subtotal} บาท</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>ส่วนลด:</Text>
            <Text style={styles.summaryValue}>{data.discount} บาท</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.summaryLabel, { fontWeight: "bold" }]}>
              ยอดสุทธิ:
            </Text>
            <Text style={[styles.summaryValue, { fontWeight: "bold" }]}>
              {data.total} บาท
            </Text>
          </View>
        </View>

        {/* หมายเหตุ */}
        {data.note && (
          <View style={styles.note}>
            <Text style={{ fontWeight: "bold" }}>หมายเหตุ:</Text>
            <Text>{data.note}</Text>
          </View>
        )}

        {/* ส่วนท้าย */}
        <View style={styles.footer}>
          <Text>
            เอกสารนี้เป็นเอกสารสำคัญทางการเงิน โปรดเก็บรักษาไว้เพื่อเป็นหลักฐาน
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default BillPDF;
