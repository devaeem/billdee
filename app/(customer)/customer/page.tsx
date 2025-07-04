"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/customer/dashboard");
  }, []);

  return <></>;
}
