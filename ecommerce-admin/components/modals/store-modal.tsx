"use client";

import { Modal } from "@/components/ui/modal";
import { useModalStore } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { storeModelSchema } from "@/lib/zod-schemas";

export function ModalStore() {
  const { isOpen, onClose } = useModalStore();

  const form = useForm<z.infer<typeof storeModelSchema>>({
    resolver: zodResolver(storeModelSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof storeModelSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/stores", values);

      toast.success("Store created successfully.");

      window.location.assign(`/${response.data.id}`); // this will give a refresh to the page
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Create Store"
      description="Add a new Store to manage Products and Categories."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 p-3 mb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter name of the Store..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-3">
                <Button
                  variant={"outline"}
                  type="button"
                  disabled={isLoading}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <span className="items-center flex gap-2">
                      Continue <Loader2 className="animate-spin size-5" />
                    </span>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
