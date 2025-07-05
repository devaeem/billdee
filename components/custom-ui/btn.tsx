import { Button as UIButton } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Btn = ({
  startIcon,
  endIcon,
  variant = "default",
  size = "default",
  children,
  onClick,
  className,
  isLoading,
  type = "button",
  disabled,
  form,
}: {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconSize?: number;
  variant?: "default" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
}) => {
  return (
    <UIButton
      type={type}
      form={form}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        "px-4 py-2 rounded-md w-fit flex items-center gap-2 transition-all duration-200",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          {startIcon && startIcon}
          {children}
          {endIcon && endIcon}
        </>
      )}
    </UIButton>
  );
};

export default Btn;
