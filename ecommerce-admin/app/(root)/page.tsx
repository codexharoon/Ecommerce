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

  return (
    <div className="flex items-center gap-3 p-4">
      <h1>Admin Dashboard</h1>
    </div>
  );
}
