
export type TVariant = {
  _id?: string;
  name: string;
  unitCount: number;
  quantity: number;
  flavor?: string;
  price: number;
  priceAfterDiscount?: number;
  images: {
    name: string;
    size: number;
    url: string;
  }[];
};
