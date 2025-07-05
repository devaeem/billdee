"use client";

import React from "react";

export interface ModeViewProps {
  value: string;
  title: string;
}

const ModeView = ({ value, title }: ModeViewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm font-medium text-gray-500">{value}</p>
    </div>
  );
};

export default ModeView;
