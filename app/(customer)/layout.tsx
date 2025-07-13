"use client";

import { useState, useEffect } from "react";
import HeaderCus from "./components/header-cus";
import Sidebar from "./components/side-bar";
import { BreadcrumbDemo } from "./components/breadcrumb";

// Breakpoint utility
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDesktop } = useBreakpoint();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const shouldShowSidebar = isDesktop || isSidebarOpen;

  // Close sidebar when switching to desktop view
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <HeaderCus />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {shouldShowSidebar && (
          <>
            {/* Backdrop for mobile/tablet */}
            {!isDesktop && (
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            {/* Sidebar content */}
            <aside
              className={`
                fixed z-40 h-[calc(100vh-4rem)] 
                ${isDesktop ? "w-64 relative" : "w-[280px]"}
                bg-white 
                transition-transform duration-300
                ${
                  !isDesktop && !isSidebarOpen
                    ? "-translate-x-full duration-300 ease-in-out"
                    : "translate-x-0 duration-300 ease-in-out"
                }
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* h-full overflow-y-auto */}
              <div className="">
                <Sidebar />
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main
          className={` bg-slate-200/20
            flex-1 transition-all duration-300
            ${isDesktop ? "" : "ml-0"}
           
            overflow-y-auto h-[calc(100vh-4rem)]
          `}
        >
          <div className="p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col gap-6">
            <BreadcrumbDemo />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
