"use client";

import { Modal } from "@/components/ui/modal";
import { useModalStore } from "@/hooks/use-store-modal";

export function ModalStore() {
  const { isOpen, onClose } = useModalStore();

  return (
    <Modal
      title="Create Store"
      description="Add a new Store to manage Products and Categories."
      isOpen={isOpen}
      onClose={onClose}
    >
      Store Modal Form
    </Modal>
  );
}
