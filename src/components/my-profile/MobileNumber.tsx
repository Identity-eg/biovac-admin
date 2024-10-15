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

type TMobileScreenFormProps = {
  _id: string;
  mobileNumber?: string;
  setScreen: React.Dispatch<React.SetStateAction<TScreen>>;
};

const mobileNumberSchema = z.object({
  mobileNumber: z
    .string().optional()
});

export default function EmailForm({
  _id,
  mobileNumber,
  setScreen,
}: TMobileScreenFormProps) {
  const form = useForm({
    defaultValues: {
      mobileNumber,
    },
    resolver: zodResolver(mobileNumberSchema),
  });

  const updateUserMutation = useUpdateUser();

  const onSubmit = (values: z.infer<typeof mobileNumberSchema>) => {
    if (values.mobileNumber) {
      updateUserMutation.mutate(
        { id: _id, data: values },
        { onSuccess: () => setScreen('details') }
      );
    }
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
              name='mobileNumber'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>mobile number</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
