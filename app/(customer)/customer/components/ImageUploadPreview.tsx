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
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("ขนาดไฟล์ต้องไม่เกิน 5MB");
      return;
    }

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Call onUploadSuccess with the preview URL
      onUploadSuccess?.(previewUrl);

      // Clean up the object URL when component unmounts
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ");
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
              <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border bg-white flex items-center justify-center">
                <Image
                  src={preview}
                  alt={`${title} preview`}
                  width={180}
                  height={180}
                  className="max-w-full max-h-full object-contain"
                  style={{ width: "auto", height: "auto" }}
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
