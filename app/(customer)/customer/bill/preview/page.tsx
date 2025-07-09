"use client";

import { PDFViewer } from "@react-pdf/renderer";
import BillPDF from "../components/bill-pdf";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    __BILL_DATA__: any;
  }
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return <div>No data provided</div>;
  }

  try {
    const billData = JSON.parse(decodeURIComponent(data));

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <PDFViewer width="100%" height="100%">
          <BillPDF data={billData} />
        </PDFViewer>
      </div>
    );
  } catch (error) {
    return <div>Invalid data format</div>;
  }
}
