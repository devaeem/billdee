"use client";

import React from "react";

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const NoData = ({
  icon,
  title = "ไม่พบข้อมูล",
  description = "กรุณาลองใหม่อีกครั้ง",
  className = "",
}: NoDataProps) => {
  return (
    <div
      className={`flex w-full h-full items-center justify-center ${className}`}
    >
      <div className="w-full h-full flex items-center justify-center p-6">
        <div
          className="w-full h-full flex flex-col items-center justify-center 
          border-[3px] border-dashed rounded-3xl px-8 py-20 md:p-16 
          border-gray-200/70 bg-gradient-to-b from-white to-gray-50/50
          backdrop-blur-sm shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]
          hover:border-gray-300/80 hover:shadow-[inset_0_2px_30px_rgba(0,0,0,0.03)]
          transition-all duration-300 ease-in-out"
        >
          {icon && (
            <div
              className="w-24 h-24 mb-8 text-gray-400/90 animate-fade-in 
            motion-safe:animate-bounce-slow"
            >
              {icon}
            </div>
          )}
          <h3
            className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 
          bg-clip-text text-transparent mb-4 animate-fade-in tracking-tight"
          >
            {title}
          </h3>
          <p className="text-gray-500 text-lg md:text-xl max-w-lg animate-fade-in leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoData;
