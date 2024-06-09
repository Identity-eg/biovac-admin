import { type ClassValue, clsx } from 'clsx';
import { FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
  }).format(price);
}

export const getDirtyFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<Record<keyof T, any>>
): Partial<T> => {
  const changedFieldValues = Object.keys(dirtyFields).reduce(
    (acc, currentField) => {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    },
    {} as Partial<T>
  );

  return changedFieldValues;
};
