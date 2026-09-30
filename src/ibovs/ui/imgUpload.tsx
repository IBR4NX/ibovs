"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AvatarUploadProps = {
  value?: File | null;
  defaultImage?: string;
  onChange?: (file: File | null) => void;
  accept?: string;
  size?: number; // px
  className?: string;
  fallbackText?: string;
};

export default function ImgUpload({
  value,
  defaultImage,
  onChange,
  accept = "image/*",
  size = 96,
  className,
  fallbackText = "تغيير صورة",
}: AvatarUploadProps) {
  const [internalFile, setInternalFile] = useState<File | null>(null);

  const file = value !== undefined ? value : internalFile;

  const preview =
    file instanceof File
      ? URL.createObjectURL(file)
      : defaultImage ?? undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;

    if (value === undefined) {
      setInternalFile(selected);
    }

    onChange?.(selected);
  };

  return (
    <Avatar
      className={`relative m-auto rounded-full overflow-hidden size-24 ${className}`}
      style={{ width: size, height: size }}
    >
      <Label htmlFor="img" className="cursor-pointer">
        <AvatarImage src={preview} />
      </Label>

      <Input
        id="img"
        type="file"
        accept={accept}
        className="absolute inset-0 z-10 size-full opacity-0 cursor-pointer"
        onChange={handleChange}
      />

      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}