import * as z from "zod";

export const storeModelSchema = z.object({
  name: z.string().min(2).max(50),
});

export const billboardModelSchema = z.object({
  label: z.string().min(2).max(50),
  imageUrl: z.string().min(1),
});

export const CategoriesModelSchema = z.object({
  name: z.string().min(2).max(50),
  billboardId: z.string().min(1),
});

export const SizeModelSchema = z.object({
  name: z.string().min(2).max(20),
  value: z.string().min(1).max(10),
});

export const ColorModelSchema = z.object({
  name: z.string().min(2).max(20),
  value: z
    .string()
    .min(3)
    .max(7)
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Invalid Hex color code",
    }),
});
