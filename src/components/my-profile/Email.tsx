import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TScreen } from '.';
import { useUpdateUser } from '@/apis/customers';
import { Loader2Icon } from 'lucide-react';

type TEmailScreenFormProps = {
  _id: string;
  email: string;
  setScreen: React.Dispatch<React.SetStateAction<TScreen>>;
};

const emailSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({ message: 'Please enter a valid email address.' }),
});

export default function EmailForm({
  _id,
  email,
  setScreen,
}: TEmailScreenFormProps) {
  const form = useForm({
    defaultValues: {
      email,
    },
    resolver: zodResolver(emailSchema),
  });

  const updateUserMutation = useUpdateUser();

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    updateUserMutation.mutate(
      { id: _id, data: values },
      { onSuccess: () => setScreen('details') }
    );
  };
  return (
    <Card className='max-w-[662px]'>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-8'
          >
            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' onClick={() => setScreen('details')}>
              Canel
            </Button>
            <Button
              type='submit'
              disabled={!form.formState.isDirty || updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? (
                <>
                  <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
