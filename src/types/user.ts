import { USER_ROLES } from '@/constants';
import { TCompany } from './company';

export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  role: typeof USER_ROLES.admin.value | typeof USER_ROLES.superAdmin.value;
  company?: TCompany;
  blocked: boolean;
  ordersCount: number;
  createdAt: string;
  updatedAt: string;
};
