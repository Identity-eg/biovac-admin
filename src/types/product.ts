import { TCategory } from './category';
import { TCompany } from './company';
import { TDosageForm } from './dosage-form';

type TProductImage = { url: string; name: string; size: number };

export type TProductVariant = {
  _id: string;
  name: string;
  slug: string;
  unitCount: number;
  flavor?: string;
  price: number;
  priceAfterDiscount?: number;
  images: TProductImage[];
  quantity: number;
  sold: number;
};

export type TProduct = {
  _id: string;
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
  variants: TProductVariant[];
  featured: boolean;
  directionOfUse: string;
  warnings: string;
  storageConditions: string;
  NFSA_REG_NO: string;
  createdAt: string;
  updatedAt: string;
};
