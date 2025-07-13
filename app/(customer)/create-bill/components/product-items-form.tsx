import {
  Control,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import Input from "@/components/custom-ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Package2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import Autocomplete from "@/components/custom-ui/autocomplete";
import { cn } from "@/lib/utils";

interface BillItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
  cost: number;
}

interface BillFormData {
  billNumber: string;
  date: string;
  customerName: string;
  phoneNumber: string;
  items: BillItem[];
  total: number;
  discount: number;
  netTotal: number;
  note: string;
}

interface ProductItemsFormProps {
  control: Control<BillFormData>;
  register: UseFormRegister<BillFormData>;
  watch: UseFormWatch<BillFormData>;
  setValue: UseFormSetValue<BillFormData>;
}

export default function ProductItemsForm({
  control,
  register,
  watch,
  setValue,
}: ProductItemsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Watch for changes in items to calculate totals
  const items = watch("items");
  useEffect(() => {
    const total = items?.reduce((sum, item) => {
      return sum + (item.quantity * item.pricePerUnit || 0);
    }, 0);
    setValue("total", total);
    setValue("netTotal", total - (watch("discount") || 0));
  }, [items, setValue, watch]);

  // Calculate cost for a specific item
  const calculateCost = (index: number) => {
    const item = items[index];
    if (item) {
      const cost = (item.quantity || 0) * (item.pricePerUnit || 0);
      setValue(`items.${index}.cost`, cost);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">รายการสินค้า</h2>
        </div>
        <Button
          onClick={() =>
            append({ name: "", quantity: 0, pricePerUnit: 0, cost: 0 })
          }
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          เพิ่มรายการ
        </Button>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Package2 className="h-12 w-12 mb-2 opacity-20" />
              <p>ยังไม่มีรายการสินค้า</p>
              <Button
                onClick={() =>
                  append({ name: "", quantity: 0, pricePerUnit: 0, cost: 0 })
                }
                variant="link"
                size="sm"
                className="mt-2"
              >
                เพิ่มรายการสินค้า
              </Button>
            </div>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="relative">
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-4">
                    <Autocomplete
                      options={[
                        { label: "สินค้า 1", value: "1" },
                        { label: "สินค้า 2", value: "2" },
                        { label: "สินค้า 3", value: "3" },
                      ]}
                      label="ชื่อสินค้า"
                      placeholder="พิมพ์เพื่อค้นหาสินค้า..."
                      {...register(`items.${index}.name`)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="จำนวน"
                      type="number"
                      min="0"
                      placeholder="0"
                      {...register(`items.${index}.quantity`)}
                      onChange={(e) => {
                        setValue(
                          `items.${index}.quantity`,
                          Number(e.target.value)
                        );
                        calculateCost(index);
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="ราคาต่อหน่วย"
                      type="number"
                      min="0"
                      placeholder="0"
                      {...register(`items.${index}.pricePerUnit`)}
                      onChange={(e) => {
                        setValue(
                          `items.${index}.pricePerUnit`,
                          Number(e.target.value)
                        );
                        calculateCost(index);
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      label="ราคารวม"
                      type="number"
                      placeholder="0"
                      {...register(`items.${index}.cost`)}
                      disabled
                      className={cn(
                        "cursor-not-allowed",
                        items[index]?.cost > 0
                          ? "bg-primary/5 font-medium"
                          : "bg-slate-50"
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {index < fields.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="font-medium">สรุปยอด</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input
                label="ส่วนลด"
                type="number"
                min="0"
                placeholder="0"
                {...register("discount")}
                onChange={(e) => {
                  const discount = Number(e.target.value);
                  setValue("discount", discount);
                  setValue("netTotal", watch("total") - discount);
                }}
              />
              <p className="text-sm text-muted-foreground px-1">
                ระบุส่วนลดเป็นจำนวนเงิน
              </p>
            </div>
            <div>
              <Input
                label="ยอดรวมสุทธิ"
                type="number"
                placeholder="0"
                {...register("netTotal")}
                disabled
                className={cn(
                  "cursor-not-allowed font-medium text-lg",
                  watch("netTotal") > 0
                    ? "bg-primary/5 border-primary/20"
                    : "bg-slate-50"
                )}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
