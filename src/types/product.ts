import { TCategory } from './category';
import { TCompany } from './company';
import { TDosageForm } from './dosage-form';

type TProductImage = { url: string; name: string; size: number };

type TProductVariant = {
  _id: string;
  name?: string;
  unitCount?: number;
  flavor?: string;
  price: number;
  priceAfterDiscount?: number;
  images: TProductImage[];
};

export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  images: TProductImage[];
  description: string;
  nutritionFacts: {
    servingSize: string;
    servingPerContainer: string;
    ingredients: {
      name: string;
      amountPerServing: string;
      dailyValue: string;
    }[];
    otherIngredients: { name: string }[];
  };
  company: Partial<TCompany>;
  dosageForm: Partial<TDosageForm>;
  category: Partial<TCategory>[];
  numReviews: number;
  averageRating: number;
  price: number;
  priceAfterDiscount?: number;
  variants: TProductVariant[];
  quantity: number;
  unitCount: number;
  featured: boolean;
  sold: number;
  directionOfUse: string;
  warnings: string;
  storageConditions: string;
  NFSA_REG_NO: string;
  createdAt: string;
  updatedAt: string;
};
