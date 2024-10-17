import {
  Building2Icon,
  HomeIcon,
  ImagesIcon,
  Layers3Icon,
  PackageIcon,
  PillIcon,
  ShoppingCartIcon,
  UsersIcon,
} from 'lucide-react';
import { USER_ROLES } from '.';

export const navLinks = [
  {
    id: 1,
    label: 'dashboard',
    path: '',
    icon: HomeIcon,
    roles: [USER_ROLES.admin.value, USER_ROLES.superAdmin.value],
  },
  {
    id: 2,
    label: 'orders',
    path: 'orders',
    icon: ShoppingCartIcon,
    roles: [USER_ROLES.admin.value, USER_ROLES.superAdmin.value],
  },
  {
    id: 3,
    label: 'products',
    path: 'products',
    icon: PackageIcon,
    roles: [USER_ROLES.admin.value, USER_ROLES.superAdmin.value],
  },
  {
    id: 4,
    label: 'categories',
    path: 'categories',
    icon: Layers3Icon,
    roles: [USER_ROLES.superAdmin.value],
  },
  {
    id: 4,
    label: 'companies',
    path: 'companies',
    icon: Building2Icon,
    roles: [USER_ROLES.superAdmin.value],
  },
  {
    id: 4,
    label: 'dosage forms',
    path: 'dosageForms',
    icon: PillIcon,
    roles: [USER_ROLES.superAdmin.value],
  },
  {
    id: 5,
    label: 'customers',
    path: 'customers',
    icon: UsersIcon,
    roles: [USER_ROLES.superAdmin.value],
  },
  {
    id: 6,
    label: 'images',
    path: 'images',
    icon: ImagesIcon,
    roles: [USER_ROLES.superAdmin.value],
  },
];
