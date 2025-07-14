"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/custom-ui/pagination";

interface Bill {
  id: string;
  date: string;
  amount: number;
}
const TableExp = () => {
  const columns: ColumnDef<Bill>[] = [
    {
      header: "วันที่",
      accessorKey: "date",
    },
  ];

  const data: Bill[] = [
    {
      id: "1",
      date: "2021-01-01",
      amount: 100,
    },
  ];
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ประวัติการขาย</CardTitle>
          <CardDescription>ประวัติการออกบิล</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <DataTable columns={columns} data={data} />
            <Pagination
              totalItems={100}
              itemsPerPage={10}
              currentPage={1}
              onPageChange={() => {}}
              onItemsPerPageChange={() => {}}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TableExp;
