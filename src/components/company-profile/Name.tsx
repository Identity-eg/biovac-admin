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
import { useUpdateCompany } from '@/apis/companies';
import { TCompany } from '@/types/company';

const nameSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export default function CompanyNameForm() {
  const navigate = useNavigate();
  const { _id, name } = useOutletContext<Pick<TCompany, '_id' | 'name'>>();
  const form = useForm({
    defaultValues: {
      name,
    },
    resolver: zodResolver(nameSchema),
  });

  const updateCompanyMutation = useUpdateCompany();

  const onSubmit = (values: z.infer<typeof nameSchema>) => {
    updateCompanyMutation.mutate(
      { id: _id, data: values },
      { onSuccess: () => navigate('/company-profile') }
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
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant='outline'
              onClick={() => navigate('/company-profile')}
            >
              Canel
            </Button>
            <Button
              type='submit'
              disabled={
                !form.formState.isDirty || updateCompanyMutation.isPending
              }
            >
              {updateCompanyMutation.isPending ? (
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
