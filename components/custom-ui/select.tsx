"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface SelectProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      containerClassName,
      required,
      value,
      onValueChange,
      placeholder,
      options,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
        {label && (
          <Label
            className={cn(
              "block text-base font-medium",
              error ? "text-red-500" : "text-gray-700"
            )}
          >
            <div className="flex items-center gap-1">
              {required && <span className="text-red-500 text-base">*</span>}
              {label}
            </div>
          </Label>
        )}

        <SelectUI
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger
            ref={ref}
            className={cn(
              "h-10 w-full rounded-2xl border bg-white p-4 text-base transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectUI>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
