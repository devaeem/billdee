"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-destructive">
          เกิดข้อผิดพลาด
        </h1>
        <h2 className="mb-4 text-2xl font-semibold">
          ขออภัย มีบางอย่างผิดพลาด
        </h2>
        <p className="mb-8 text-muted-foreground">
          โปรดลองใหม่อีกครั้ง หากยังพบปัญหากรุณาติดต่อผู้ดูแลระบบ
        </p>
        <Button
          onClick={reset}
          variant="outline"
          className="hover:bg-destructive hover:text-destructive-foreground"
        >
          ลองใหม่อีกครั้ง
        </Button>
      </div>
    </div>
  );
}
