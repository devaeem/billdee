import React from "react";
import { BillForm } from "../components/bill-form";

const Bill = () => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:px-6">
      <BillForm />
    </div>
  );
};

export default Bill;
