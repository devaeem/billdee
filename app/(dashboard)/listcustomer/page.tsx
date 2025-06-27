import React from "react";
import ListCustomerManagement from "./components/list-customer-management";

const ListCustomerPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:px-6">
      <h1 className="text-2xl font-bold">รายชื่อลูกค้า</h1>

      <div className="flex flex-col gap-4">
        <ListCustomerManagement />
      </div>
    </div>
  );
};

export default ListCustomerPage;
