import { AxiosError } from 'axios';
import { APP_COMPANIES, DOSAGE_FORMS, ORDER_STATUS } from './constants';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{ msg: string }>;
  }
}

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  ordersCount: number;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  images: { url: string; name: string; size: number }[];
  description: string;
  nutritionFacts: string;
  company: (typeof APP_COMPANIES)[number];
  itemForm: (typeof DOSAGE_FORMS)[number];
  category: Partial<TCategory>[];
  freeShipping: boolean;
  numReviews: number;
  averageRating: number;
  price: number;
  quantity: number;
  featured: boolean;
  sold: number;
  createdAt: string;
  updatedAt: string;
};

export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  productsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderItem = {
  product: {
    _id: string;
    description: string;
  };
  amount: number;
  price: number;
  name: string;
  image: string;
  _id: string;
};

export type TOrder = {
  _id: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: TOrderItem[];
  shippingFee: number;
  subtotal: number;
  total: number;
  status: (typeof ORDER_STATUS)[number];
  deliveredAt: string;
  createdAt: string;
  updatedAt: string;
};
