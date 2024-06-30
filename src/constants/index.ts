export const APP_COMPANIES = ['polygon', 'biovac', 'test'] as const;

export const DOSAGE_FORMS = [
  'film_coated_tablets',
  'sugar_coated_tablets',
  'effervescent_tablets',
  'chewable_tablets',
  'orally_disintegrating_tablets',
  'sublingual_tablets',
  'soft_gelatin_capsules',
  'hard_gelatin_capsules',
  'liquids',
  'powders',
  'gummies',
  'injections',
] as const;

export const ORDER_STATUS = [
  'pending',
  'processing',
  'shipping',
  'delivered',
  'canceled',
] as const;
