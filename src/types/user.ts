import { USER_ROLES } from '@/constants';
import { TCompany } from './company';

export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: typeof USER_ROLES.admin | typeof USER_ROLES.superAdmin;
  company?: TCompany;
  blocked: boolean;
  ordersCount: number;
  createdAt: string;
  updatedAt: string;
};
