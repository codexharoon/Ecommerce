import * as z from "zod";

export const storeModelSchema = z.object({
  name: z.string().min(2).max(50, { message: "Name is required" }),
});

export const billboardModelSchema = z.object({
  label: z.string().min(2).max(50, { message: "Label is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

export const CategoriesModelSchema = z.object({
  name: z.string().min(2).max(50, { message: "Name is required" }),
  billboardId: z.string().min(1, { message: "Billboard is required" }),
});

export const SizeModelSchema = z.object({
  name: z.string().min(2).max(20, { message: "Name is required" }),
  value: z.string().min(1).max(10, { message: "Value is required" }),
});

export const ColorModelSchema = z.object({
  name: z.string().min(2).max(20, { message: "Name is required" }),
  value: z
    .string()
    .min(3)
    .max(7)
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Invalid Hex color code",
    }),
});

export const ProductModelSchema = z.object({
  name: z.string().min(2).max(50, { message: "Name is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  sizeId: z.string().min(1, { message: "Size is required" }),
  colorId: z.string().min(1, { message: "Color is required" }),
  images: z
    .object({
      url: z.string(),
    })
    .array()
    .min(1, { message: "At least one image is required" }),
});
