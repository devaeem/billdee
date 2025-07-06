"use client";
import React from "react";
import CardStatus from "./components/card-statu";
import ReportSales from "./components/report-sales";
import ProductBaseSale from "./components/product-base-sale";
import CustomerBaseBuy from "./components/customer-base-buy";

const DashboardPage = () => {
  // const stats = {
  //   totalSales: 468000,
  //   totalOrders: 144,
  //   activeStores: 3,
  // };

  // const [greeting, setGreeting] = useState("");

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour >= 5 && hour < 12) {
  //     setGreeting("สวัสดีตอนเช้า");
  //   } else if (hour >= 12 && hour < 17) {
  //     setGreeting("สวัสดีตอนบ่าย");
  //   } else if (hour >= 17 && hour < 21) {
  //     setGreeting("สวัสดีตอนเย็น");
  //   } else {
  //     setGreeting("สวัสดีตอนกลางคืน");
  //   }
  // }, []);

  return (
    <>
      <CardStatus />
      <ReportSales />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <ProductBaseSale />
        <CustomerBaseBuy />
      </div>
    </>
  );
};

export default DashboardPage;
