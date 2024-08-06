
export const ORDER_STATUS = [
  'pending',
  'processing',
  'shipping',
  'delivered',
  'canceled',
] as const;

export const IMAGES_PATHS = {
  hero: 'hero',
} as const;

export const USER_ROLES = {
  user: 'USER',
  admin: 'ADMIN',
  superAdmin: 'SUPER_ADMIN',
} as const;