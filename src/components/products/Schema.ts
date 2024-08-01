import { z } from 'zod';

const nutrationFactSchema = {
  servingSize: z.string().min(1, { message: 'Size is required' }),
  servingPerContainer: z.string().min(1, { message: 'Container is required' }),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        amountPerServing: z
          .string()
          .min(1, { message: 'Amount per serving is required' }),
        dailyValue: z.string().min(1, { message: 'daily value is required' }),
      })
    )
    .min(1, { message: 'Ingredients must be one element at least' }),
  otherIngredients: z
    .array(
      z.object({ name: z.string().min(1, { message: 'Name is required' }) })
    )
    .min(1, { message: 'Ingredients must be one element at least' }),
};

const imagesSchema = z.object({
  url: z.string().min(1, { message: 'URL is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  size: z.number().min(1, { message: 'Size is required' }),
});

const variantsSchema = z.object({
  name: z.string().optional(),
  unitCount: z.coerce.number().optional(),
  flavor: z.string().optional(),
  price: z.coerce
    .number({ invalid_type_error: 'Price is required' })
    .min(1, { message: 'Price must be greater than 0' }),
  priceAfterDiscount: z.coerce.number().optional(),
  images: z.array(imagesSchema).min(1, { message: 'Image is required' }),
});

export const productSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  nutritionFacts: z.object(nutrationFactSchema),
  company: z.string().min(1, {
    message: 'Company is required',
  }),
  category: z
    .array(z.object({ name: z.string(), _id: z.string() }))
    .min(1, { message: 'Category is required' }),
  dosageForm: z.string().min(1, {
    message: 'Dosage Form is required',
  }),
  unitCount: z.coerce
    .number()
    .min(1, { message: 'Price must be greater than 0' }),
  price: z.coerce.number().min(1, { message: 'Price must be greater than 0' }),
  priceAfterDiscount: z.coerce.number().optional(),
  // .min(1, { message: 'Price must be greater than 0' }),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity is required' })
    .min(1, { message: 'Quantity must be greater than 0' }),
  featured: z.boolean(),
  images: z.array(imagesSchema).min(1, { message: 'Image is required' }),
  variants: z.array(variantsSchema).optional(),
  directionOfUse: z.string().min(1, {
    message: 'Direction of use is required',
  }),
  warnings: z.string(),
  storageConditions: z.string(),
  NFSA_REG_NO: z.string(),
});
