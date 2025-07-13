"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input as InputUI } from "../ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  required?: boolean;
  op?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      startIcon,
      op = false,
      endIcon,
      containerClassName,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("w-full ", containerClassName)}>
        {label && (
          <Label
            className={cn(
              "mb-1 block text-sm font-medium",
              error ? "text-red-500" : "text-gray-700"
            )}
          >
            <div className="flex items-center gap-1">
              {required && <span className="text-red-500 text-base">*</span>}
              {label}
              {op && <span className="text-gray-500 text-sm">{op}</span>}
            </div>
          </Label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}

          <InputUI
            type={type}
            autoFocus={false}
            className={cn(
              "h-12 w-full rounded-2xl border bg-white px-4 text-base transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
              error && "border-red-500 focus:ring-red-500",
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
