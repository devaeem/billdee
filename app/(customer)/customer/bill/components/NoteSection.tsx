"use client";

import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { formSchema } from "./create-bill";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

interface NoteSectionProps {
  control: Control<FormValues>;
}

const NoteSection = ({ control }: NoteSectionProps) => {
  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">หมายเหตุ</h2>
          <p className="text-sm text-gray-500 mt-1">
            เพิ่มรายละเอียดหรือข้อมูลเพิ่มเติม
          </p>
        </div>
      </div>
      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                placeholder="เพิ่มหมายเหตุหรือรายละเอียดเพิ่มเติม เช่น วันที่นัดส่ง ข้อมูลการติดตั้ง หรืออื่นๆ"
                className="min-h-[120px] bg-white focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};

export default NoteSection;
