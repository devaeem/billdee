"use client";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

import React, { useRef } from "react";
import Image from "next/image";

interface ImageUploadPreviewProps {
  type: "logo" | "qr";
  preview: string | null;
  title: string;
  subtitle: string;
  onUploadSuccess?: (url: string) => void;
  onRemove?: () => void;
}

const ImageUploadPreview = ({
  type,
  preview,
  title,
  subtitle,
  onUploadSuccess,
  onRemove,
}: ImageUploadPreviewProps) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement actual file upload logic here
      // For now, we'll use a fake URL
      const fakeUrl = URL.createObjectURL(file);
      onUploadSuccess?.(fakeUrl);
    }
  };

  const handleRemoveImage = () => {
    onRemove?.();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="space-y-2">
        <Label className="text-gray-700">{title}</Label>

        <div className="flex items-start gap-4">
          {preview ? (
            <div className="relative group">
              <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border bg-white">
                <Image
                  src={preview}
                  alt={`${title} preview`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                inputRef.current?.click();
              }}
              className="w-full h-[200px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">คลิกเพื่ออัพโหลด</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              type="file"
              id={type}
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadPreview;

// import { Upload } from "lucide-react";

// const ImageUploadPreview = ({
//   type,
//   preview,
//   title,
//   subtitle,
// }: {
//   type: "logo" | "qr";
//   preview: string | null;
//   title: string;
//   subtitle: string;
// }) => (

// );
