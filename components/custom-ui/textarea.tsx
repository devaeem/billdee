import React from "react";
import { Textarea as TextareaUI } from "@/components/ui/textarea";
import { Label } from "../ui/label";

interface TextareaCustomProps extends React.ComponentProps<"textarea"> {
  label?: string;
  description?: string;
  error?: string;
}

const Textarea = ({
  label,
  description,
  error,
  ...props
}: TextareaCustomProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label
          htmlFor={props.id}
          className="block text-[16px] font-normal text-black "
        >
          <div className="flex items-center gap-1">
            {props.required && (
              <span className="text-red-500 text-base">*</span>
            )}
            {label}
          </div>
        </Label>
        <TextareaUI
          className={`${props.disabled ? "bg-[#F8FAFC]" : "bg-white"} ${
            error
              ? "border-red-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
              : "border-[#E2E8F0] focus-visible:ring-2 focus-visible:ring-offset-2 ocus-visible:ring-[#64748B]"
          } text-[#000000]`}
          disabled={props.disabled}
          {...props}
          required={false}
        />
        {(description || error) && (
          <p
            className={`text-[16px] not-italic font-normal leading-[14px] ${
              error ? "text-red-600" : "text-[#64748B]"
            } ${props.disabled ? "opacity-50" : " opacity-100"}`}
          >
            {error ? error : description}
          </p>
        )}
      </div>
    </>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
