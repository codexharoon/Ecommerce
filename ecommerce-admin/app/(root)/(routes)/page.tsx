"use client";

import { useModalStore } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Home() {
  const { isOpen, onOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
