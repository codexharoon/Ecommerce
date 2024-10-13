"use client";

import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SizeModelSchema } from "@/lib/zod-schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm = ({ initialData }: SizeFormProps) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Update Size details" : "Add a new Size";
  const buttonText = initialData ? "Save Changes" : "Create Size";
  const toastMessage = initialData
    ? "Size updated successfully."
    : "Size created successfully.";

  const form = useForm<z.infer<typeof SizeModelSchema>>({
    resolver: zodResolver(SizeModelSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SizeModelSchema>) {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${initialData.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, values);
      }

      router.replace(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);

      if (initialData) {
        await axios.delete(`/api/${params.storeId}/sizes/${initialData.id}`);
      }

      router.replace(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.error(error);
      toast.error("Make sure you removed all products using this Size.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            {buttonText}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
