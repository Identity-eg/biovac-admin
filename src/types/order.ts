import { ORDER_STATUS } from "@/constants";

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
