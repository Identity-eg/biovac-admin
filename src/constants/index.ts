export const ORDER_STATUS = {
  processing: {
    label: 'Processing',
    value: 'processing',
    color: '',
  },
  shipped: {
    label: 'Shipped',
    value: 'shipped',
    color: '',
  },
  delivered: {
    label: 'Delivered',
    value: 'delivered',
    color: '',
  },
  cancelled: {
    label: 'Cancelled', 
    value: 'cancelled',
    color: '',
  },
} as const;

export const IMAGES_PATHS = {
  hero: 'hero',
} as const;

export const USER_ROLES = {
  user: 'USER',
  admin: 'ADMIN',
  superAdmin: 'SUPER_ADMIN',
} as const;
