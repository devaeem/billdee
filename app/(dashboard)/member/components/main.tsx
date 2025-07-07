"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import UsersFilter from "./users-flter";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import Btn from "@/components/custom-ui/btn";
import Pagination from "@/components/custom-ui/pagination";
import useSWR from "swr";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { EditIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HttpPaginationResponse, User } from "../types";

const Main = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: users } = useSWR<HttpPaginationResponse<User>>(
    `users?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
    {
      revalidateOnFocus: false,
    }
  );

  const handleAction = (action: "view" | "edit" | "delete", user: User) => {
    if (action === "delete") {
      // TODO: Implement delete functionality
      return;
    }
    if (action === "view") {
      router.push(`/member/${user.id}`);
    } else if (action === "edit") {
      router.push(`/member/${user.id}/edit`);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      header: "อีเมล",
      accessorKey: "email",
      cell: ({ row }) => {
        return <span>{row.original.email || "-"}</span>;
      },
    },
    {
      header: "ชื่อจริง",
      accessorKey: "firstName",
      cell: ({ row }) => {
        return <span>{row.original.firstName || "-"}</span>;
      },
    },
    {
      header: "นามสกุล",
      accessorKey: "lastName",
      cell: ({ row }) => {
        return <span>{row.original.lastName || "-"}</span>;
      },
    },
    {
      header: "เบอร์โทรศัพท์",
      accessorKey: "phone",
      cell: ({ row }) => {
        return <span>{row.original?.accounts[0]?.phone || "-"}</span>;
      },
    },
    {
      header: "สิทธิ์การใช้งาน",
      accessorKey: "role",
      cell: ({ row }) => {
        return (
          <Badge
            variant="outline"
            className={`bg-orange-500 text-white ${
              row.original.role === "ADMIN" ? "bg-orange-500" : "bg-green-500"
            }`}
          >
            {row.original.role === "ADMIN" ? "ผู้ดูแลระบบ" : "ผู้ใช้งาน"}
          </Badge>
        );
      },
    },
    {
      header: "สถานะ",
      accessorKey: "status",
      cell: ({ row }) => {
        return (
          <Badge
            variant="outline"
            className={`bg-orange-500 text-white ${
              row.original.isActive ? "bg-orange-500" : "bg-green-500"
            }`}
          >
            {row.original.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
          </Badge>
        );
      },
    },
    {
      header: "",
      accessorKey: "handel",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Btn
              variant="outline"
              size="sm"
              onClick={() => handleAction("view", row.original)}
            >
              <HugeiconsIcon icon={EyeIcon} size={16} />
            </Btn>
            <Btn
              variant="outline"
              size="sm"
              onClick={() => handleAction("edit", row.original)}
            >
              <HugeiconsIcon icon={EditIcon} size={16} />
            </Btn>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายชื่อสมาชิก</CardTitle>
        <CardDescription>รายชื่อสมาชิกทั้งหมด</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UsersFilter
          setSearch={setSearch}
          onCreateClick={() => router.push("/member/create")}
        />
        <div className="flex flex-col gap-4">
          <DataTable columns={columns} data={users?.data?.data || []} />
          <Pagination
            totalItems={users?.totalItems || 0}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(itemsPerPage) =>
              setItemsPerPage(itemsPerPage)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Main;
