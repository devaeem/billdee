"use client";

import HeaderCus from "./customer/components/header-cus";
import Sidebar from "./customer/components/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container mx-auto">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
          <div className="container mx-auto">
            <HeaderCus />
          </div>
        </div>

        <div className="flex gap-4 pt-16 p-4 lg:px-6">
          {/* Fixed Sidebar */}
          <div className="fixed w-64">
            <Sidebar />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 ml-64">
            <div className="flex flex-col gap-4 p-4 lg:px-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
