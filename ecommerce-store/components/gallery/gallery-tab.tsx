import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import React from "react";

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab = ({ image }: GalleryTabProps) => {
  return (
    <Tab
      className={
        "relative flex aspect-square cursor-pointer items-center rounded-md bg-white"
      }
    >
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              src={image.url}
              alt={"image"}
              fill
              className="rounded-md object-cover object-center"
            />
          </span>

          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
