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

export const navLinks = [
  { id: 1, label: 'dashboard', path: '', icon: HomeIcon },
  { id: 2, label: 'orders', path: 'orders', icon: ShoppingCartIcon },
  { id: 3, label: 'products', path: 'products', icon: PackageIcon },
  { id: 4, label: 'categories', path: 'categories', icon: Layers3Icon },
  { id: 4, label: 'companies', path: 'companies', icon: Building2Icon },
  { id: 4, label: 'dosage forms', path: 'dosageForms', icon: PillIcon },
  {
    id: 5,
    label: 'customers',
    path: 'customers',
    icon: UsersIcon,
  },
  { id: 6, label: 'images', path: 'images', icon: ImagesIcon },
];
