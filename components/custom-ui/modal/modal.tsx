import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[550px]", className)}>
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        {title && (
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {title}
            </DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};
