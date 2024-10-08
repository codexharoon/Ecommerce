"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  values: string[];
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

const ImageUpload = ({
  values,
  disabled,
  onChange,
  onRemove,
}: ImageUploadProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((url) => (
          <div className="relative size-[200px] rounded-md shadow-sm overflow-hidden">
            <Button
              type="button"
              variant={"destructive"}
              className="absolute top-2 right-2 z-10"
              onClick={() => onRemove(url)}
            >
              <Trash className="size-4" />
            </Button>

            <Image
              alt="image"
              src={url}
              className="object-cover"
              fill
              sizes="200px"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onSuccess={onUpload} uploadPreset="idaekahp">
        {({ open }) => {
          return (
            <Button
              type="button"
              variant={"secondary"}
              disabled={disabled}
              onClick={() => open()}
            >
              <ImagePlus className="size-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
