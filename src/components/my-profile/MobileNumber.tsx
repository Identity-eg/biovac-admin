import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2Icon } from 'lucide-react';
// UI
import { Card, CardContent } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// Utils
import { useUpdateUser } from '@/apis/customers';
import { TUser } from '@/types/user';

const mobileNumberSchema = z.object({
  mobileNumber: z.string().optional(),
});

export default function MobileNumberForm() {
  const navigate = useNavigate();
  const { _id, mobileNumber } =
    useOutletContext<Pick<TUser, '_id' |'mobileNumber'>>();
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
        { onSuccess: () => navigate('/my-profile') }
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
            <Button
              type='button'
              variant='outline'
              onClick={() => navigate('/my-profile')}
            >
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
