"use client";

import { useProfile } from "@/hooks/use-profile";
import React from "react";

const G = () => {
  const { data, isLoading, error } = useProfile();
  return (
    <div className="p-4">
      <pre className="whitespace-pre-wrap">
        {" "}
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default G;
