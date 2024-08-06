import { USER_ROLES } from '@/constants';
import { TCompany } from './company';

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: typeof USER_ROLES.admin | typeof USER_ROLES.superAdmin;
  company: TCompany | undefined;
  createdAt: string;
  updatedAt: string;
};
