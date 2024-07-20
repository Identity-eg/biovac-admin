import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import {
  useCreateCompany,
  useUpdateCompany,
  useViewCompany,
} from '@/apis/companies';

const companySchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export default function CompanyForm() {
  const { companyId } = useParams();

  const form = useForm<z.infer<typeof companySchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(companySchema),
  });

  const navigate = useNavigate();

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const viewCompanyQuery = useViewCompany({
    id: companyId ? companyId : undefined,
  });

  useEffect(() => {
    if (viewCompanyQuery.data) {
      const { name } = viewCompanyQuery.data;
      const newValues = {
        name,
      };
      form.reset(newValues);
    }
  }, [viewCompanyQuery.data]);

  const onSubmit = (values: z.infer<typeof companySchema>) => {
    if (companyId) {
      updateCompany.mutate(
        {
          data: values,
          id: companyId,
        },
        {
          onSuccess: () => navigate('/companies'),
        }
      );
    } else {
      createCompany.mutate(
        {
          data: values,
        },
        {
          onSuccess: () => navigate('/companies'),
        }
      );
    }
  };
  // console.log('form values', form.watch());

  return (
    <section className='space-y-8 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/companies' className='space-x-2'>
            <Undo2 />
            <span className='capitalize'>back to companies</span>
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 gap-8'>
            {/* Company Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>company name</FormLabel>
                  <FormControl>
                    <Input placeholder='company name...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={!form.formState.dirtyFields.name}>
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
