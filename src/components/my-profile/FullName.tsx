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
import { TScreen } from '.';
// Utils
import { useUpdateUser } from '@/apis/customers';

type TFullNameScreenFormProps = {
  _id: string;
  firstName: string;
  lastName: string;
  setScreen: React.Dispatch<React.SetStateAction<TScreen>>;
};

const fullNameSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
});

export default function FullNameForm({
  _id,
  firstName,
  lastName,
  setScreen,
}: TFullNameScreenFormProps) {
  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
    },
    resolver: zodResolver(fullNameSchema),
  });

  const updateUserMutation = useUpdateUser();

  const onSubmit = (values: z.infer<typeof fullNameSchema>) => {
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
            {/* First Name */}
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Last Name */}
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
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
