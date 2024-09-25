"use client";

import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export default function Home() {
  const [showDialog, setShowDialog] = useState(true);

  return (
    <div className="flex items-center gap-3 p-4">
      <h1>Admin Dashboard</h1>
      <Modal
        title="test"
        description="test decs..."
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      >
        Children{" "}
      </Modal>
    </div>
  );
}
