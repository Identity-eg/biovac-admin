import { z } from 'zod';

const nutrationFactSchema = {
  servingSize: z.string().min(1, 'Size is required'),
  servingPerContainer: z.string().min(1, 'Container is required'),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        amountPerServing: z.string().min(1, 'Amount per serving is required'),
        dailyValue: z.string().min(1, 'daily value is required'),
      })
    )
    .min(1, 'Ingredients must be one element at least'),
  otherIngredients: z
    .array(z.object({ name: z.string().min(1, 'Name is required') }))
    .min(1, 'Other Ingredients must be one element at least'),
};

const imagesSchema = z.object({
  url: z.string().min(1, 'URL is required'),
  name: z.string().min(1, 'Name is required'),
  size: z.number().min(1, 'Size is required'),
});

export const variantsSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  unitCount: z.coerce
    .number({ invalid_type_error: 'Quantity is required' })
    .min(1, 'UnitCount must be greater than 0'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity is required' }),
  flavor: z.string().optional(),
  price: z.coerce
    .number({ invalid_type_error: 'Price is required' })
    .min(1, 'Price must be greater than 0'),
  priceAfterDiscount: z.coerce.number().optional(),
  images: z.array(imagesSchema).min(1, 'Image is required'),
});

export const productSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  nutritionFacts: z.object(nutrationFactSchema),
  company: z.string().min(1, 'Company is required'),
  category: z
    .array(z.object({ name: z.string(), _id: z.string() }))
    .min(1, 'Category is required'),
  dosageForm: z.string().min(1, 'Dosage Form is required'),
  featured: z.boolean(),
  variants: z
    .array(variantsSchema)
    .min(1, 'Variants must be one element at least'),
  directionOfUse: z.string().min(1, 'Direction of use is required'),
  warnings: z.string(),
  storageConditions: z.string(),
  NFSA_REG_NO: z.string(),
});
