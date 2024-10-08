"use client";

import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { billboardModelSchema } from "@/lib/zod-schemas";
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
import ImageUpload from "@/components/image-upload";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData
    ? "Update Billboard details"
    : "Add a new Billboard";
  const buttonText = initialData ? "Save Changes" : "Create Billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully."
    : "Billboard created successfully.";

  const form = useForm<z.infer<typeof billboardModelSchema>>({
    resolver: zodResolver(billboardModelSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof billboardModelSchema>) {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${initialData.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      }

      toast.success(toastMessage);
      router.replace(`/${params.storeId}/billboards`);
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
        await axios.delete(
          `/api/${params.storeId}/billboards/${initialData.id}`
        );
      }

      toast.success(toastMessage);
      router.replace(`/${params.storeId}/billboards`);
      // window.location.assign(`/${params.storeId}/billboards`);
    } catch (error) {
      console.error(error);
      toast.error("Make sure to delete all products and categories first.");
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    values={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
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

export default BillboardForm;
