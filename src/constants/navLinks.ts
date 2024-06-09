import {
  Home,
  Layers3,
  MessagesSquare,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';

export const navLinks = [
  { id: 1, label: 'dashboard', path: '', icon: Home },
  { id: 2, label: 'orders', path: 'orders', icon: ShoppingCart },
  { id: 3, label: 'products', path: 'products', icon: Package },
  { id: 4, label: 'categories', path: 'categories', icon: Layers3 },
  {
    id: 5,
    label: 'customers',
    path: 'customers',
    icon: Users,
  },
  // { id: 6, label: 'messages', path: 'messages', icon: MessagesSquare },
];
