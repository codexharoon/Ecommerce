"use client";

import React from "react";
import { Heading } from "./ui/Heading";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { Store } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { storeModelSchema } from "@/lib/zod-schemas";
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

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [loading, setLoading] = React.useState(false);

  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof storeModelSchema>>({
    resolver: zodResolver(storeModelSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof storeModelSchema>) {
    try {
      setLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();

      toast.success("Store updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />

        <Button disabled={loading} variant={"destructive"} size={"icon"}>
          <Trash className="h-5 w-5" />
        </Button>
      </div>

      <Separator className="m-4" />

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
                      placeholder="xyz store"
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
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
