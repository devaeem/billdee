import React from "react";
import ListStoreManagement from "./components/list-store-management";

const ListStorePage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:px-6">
      <h1 className="text-2xl font-bold">รายการร้านค้า</h1>

      <div className="flex flex-col gap-4">
        <ListStoreManagement />
      </div>
    </div>
  );
};

export default ListStorePage;
