import * as z from "zod";

export const storeModelSchema = z.object({
  name: z.string().min(2).max(50),
});

export const billboardModelSchema = z.object({
  label: z.string().min(2).max(50),
  imageUrl: z.string().min(1),
});
