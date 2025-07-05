import { DialogFooter } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { HugeiconsIcon } from "@hugeicons/react";
import { Modal } from "./modal";
import {
  FloppyDiskIcon,
  Loading01Icon,
  MultiplicationSignIcon,
} from "@hugeicons/core-free-icons";

interface FormModalProps<TFieldValues extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  methods?: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  submitText?: string;
  cancelText?: string;
  className?: string;
  loading?: boolean;
  loadingText?: string;
}

export function ModalForm<TFieldValues extends FieldValues>({
  isOpen,
  onClose,
  title,
  children,
  methods,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
  className,
  loading,
  loadingText = "Loading...",
}: FormModalProps<TFieldValues>) {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      className={className}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!methods) return;
          methods.handleSubmit(onSubmit)(e);
        }}
        className="space-y-6"
      >
        {children}
        <DialogFooter className="flex flex-row items-center justify-between sm:justify-between gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            <div className="flex items-center">
              <HugeiconsIcon
                icon={MultiplicationSignIcon}
                size={16}
                className="mr-2"
              />{" "}
              {cancelText}
            </div>
          </Button>
          <Button
            type="submit"
            disabled={methods?.formState.isSubmitting || loading}
          >
            {methods?.formState.isSubmitting || loading ? (
              <div className="flex items-center">
                <HugeiconsIcon
                  icon={Loading01Icon}
                  size={16}
                  className="mr-2 animate-spin"
                />{" "}
                {loadingText}
              </div>
            ) : (
              <div className="flex items-center">
                <HugeiconsIcon
                  icon={FloppyDiskIcon}
                  size={16}
                  className="mr-2"
                />{" "}
                {submitText}
              </div>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Modal>
  );
}
