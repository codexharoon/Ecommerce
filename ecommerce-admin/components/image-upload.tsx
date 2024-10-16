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
    console.log(result);
    onChange(result.info.secure_url);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((url) => (
          <div
            key={`image-${url}`}
            className="relative w-[200px] h-[200px] rounded-md shadow-sm overflow-hidden"
          >
            <Button
              type="button"
              variant={"destructive"}
              size={"icon"}
              className="absolute top-2 right-2 z-10"
              onClick={() => onRemove(url)}
            >
              <Trash className="size-4" />
            </Button>

            <Image
              alt="image"
              src={url}
              className="object-cover w-auto h-auto"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        options={{ multiple: true }}
        uploadPreset="idaekahp"
      >
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
