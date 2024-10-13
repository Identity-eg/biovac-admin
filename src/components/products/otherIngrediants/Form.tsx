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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// Utils
import { nutrationFactSchema, productSchema } from '../Schema';

export default function OtherIngrediantForm({
  otherIngredientsAppend,
}: {
  otherIngredientsAppend: UseFieldArrayAppend<
    z.infer<typeof productSchema>,
    'nutritionFacts.otherIngredients'
  >;
}) {
  const [isOtherIngrediantFormOpened, setOtherIngrediantForm] = useState(false);
  const form = useForm<
    z.infer<typeof nutrationFactSchema.otherIngredients.element>
  >({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(nutrationFactSchema.otherIngredients.element),
  });

  function handleSubmit(
    values: z.infer<typeof nutrationFactSchema.otherIngredients.element>
  ) {
    otherIngredientsAppend(values);
    setOtherIngrediantForm(false);
    form.reset();
  }

  return (
    <Dialog
      open={isOtherIngrediantFormOpened}
      onOpenChange={setOtherIngrediantForm}
    >
      <DialogTrigger asChild>
        <Button type='button' variant='secondary' className='space-x-4'>
          <PlusCircleIcon />
          <span>Add Other Ingredients</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Other Ingrediant Form</DialogTitle>
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
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.name && (
                  <p className='text-sm font-medium text-destructive'>
                    {String(form.formState.errors.name.message)}
                  </p>
                )}
              </FormItem>
            )}
          />

          <DialogFooter className='sm:justify-start'>
            {/* <DialogClose asChild> */}
            <Button type='submit'>Add</Button>
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
