import { ORDER_STATUS } from '@/constants';
import { TVariant } from './variant';

export type TOrderItem = {
  product: string;
  amount: number;
  variant: TVariant;
  totalProductPrice: number;
};

type TAddress = {
  user: string;
  firstName: string;
  lastName: string;
  email: string;
  governorate: string;
  city: string;
  phone: number;
  additionalPhone: number;
  street: string;
  buildingNo: string;
  floor: string;
};

// type TOrderStatus = 

export type TOrder = {
  _id: string;
  shippingAddress: TAddress;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
  };
  orderItems: TOrderItem[];
  shippingFee: number;
  subtotal: number;
  total: number;
  status: (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS]["value"];
  paid: boolean;
  paymentMethod: {
    id: string;
    name: string;
  };
  deliveredAt: string;
  createdAt: string;
  updatedAt: string;
};
