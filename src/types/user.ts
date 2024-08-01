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
