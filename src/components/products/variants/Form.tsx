import { useState } from 'react';
import { UseFieldArrayAppend, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircleIcon } from 'lucide-react';
// UI
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UploadImage from '../UploadImages';
// Utils
import { productSchema, variantsSchema } from '../Schema';
import { useAddVariant } from '@/apis/variants';

export default function VariantForm({
  variantsAppend,
}: {
  variantsAppend: UseFieldArrayAppend<
    z.infer<typeof productSchema>,
    'variants'
  >;
}) {
  const [isVariantFormOpened, setVariantForm] = useState(false);
  const form = useForm<z.infer<typeof variantsSchema>>({
    defaultValues: {
      name: '',
      unitCount: undefined,
      flavor: '',
      price: undefined,
      priceAfterDiscount: undefined,
      quantity: undefined,
      images: [],
    },
    resolver: zodResolver(variantsSchema),
  });

  const addVariant = useAddVariant();

  function handleSubmit(values: z.infer<typeof variantsSchema>) {
    addVariant.mutate(values, {
      onSuccess: (data) => {
        variantsAppend(data.variant);
        setVariantForm(false);
        form.reset();
      },
    });
  }
  // console.log('child errors', form.formState.errors);
  return (
    <Dialog open={isVariantFormOpened} onOpenChange={setVariantForm}>
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='outline'
          size='lg'
          className='w-full py-6 space-x-4'
        >
          <PlusCircleIcon />
          <span className='text-lg'>Add variant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Variant Form</DialogTitle>
        </DialogHeader>
        <form
          className='grid lg:grid-cols-2 gap-x-4 gap-y-6'
          onSubmit={(e) => {
            e.stopPropagation();
            return form.handleSubmit(handleSubmit)(e);
          }}
        >
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='lg:col-span-2'>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder='product name...' {...field} />
                </FormControl>
                {form.formState.errors.name && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.name.message)}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* Unit Count */}
          <FormField
            control={form.control}
            name='unitCount'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>unit count</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                {form.formState.errors.unitCount && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.unitCount.message)}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* Quantity */}
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>quantity</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                {form.formState.errors.quantity && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.quantity.message)}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* Price */}
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>price</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                {form.formState.errors.price && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.price.message)}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* Price After Discount */}
          <FormField
            control={form.control}
            name='priceAfterDiscount'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>price After Discount</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                {form.formState.errors.priceAfterDiscount && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.priceAfterDiscount.message)}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='flavor'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel className='text-xs'>
                  flavor{' '}
                  <span className='text-xs text-gray-500'>(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.flavor && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.flavor.message)}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Images */}
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='lg:col-span-2'>
                <FormLabel className='text-xs'>images</FormLabel>
                <FormControl>
                  <UploadImage
                    setValue={form.setValue}
                    getValues={form.getValues}
                  />
                </FormControl>
                {form.formState.errors.images && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.images.message)}
                  </p>
                )}
              </FormItem>
            )}
          />
          <DialogFooter className='sm:justify-start'>
            {/* <DialogClose asChild> */}
            <Button type='submit'>Add variant</Button>
            {/* </DialogClose> */}
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
