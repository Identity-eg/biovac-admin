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
  useCreateDosageForm,
  useUpdateDosageForm,
  useViewDosageForm,
} from '@/apis/dosageForm';

const dosageFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export default function DosageFormForm() {
  const { dosageFormId } = useParams();

  const form = useForm<z.infer<typeof dosageFormSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(dosageFormSchema),
  });

  const navigate = useNavigate();

  const createDosageForm = useCreateDosageForm();
  const updateDosageForm = useUpdateDosageForm();

  const viewDosageFormQuery = useViewDosageForm({
    id: dosageFormId ? dosageFormId : undefined,
  });

  useEffect(() => {
    if (viewDosageFormQuery.data) {
      const { name } = viewDosageFormQuery.data;
      const newValues = {
        name,
      };
      form.reset(newValues);
    }
  }, [viewDosageFormQuery.data]);

  const onSubmit = (values: z.infer<typeof dosageFormSchema>) => {
    if (dosageFormId) {
      updateDosageForm.mutate(
        {
          data: values,
          id: dosageFormId,
        },
        {
          onSuccess: () => navigate('/dosageForms'),
        }
      );
    } else {
      createDosageForm.mutate(
        {
          data: values,
        },
        {
          onSuccess: () => navigate('/dosageForms'),
        }
      );
    }
  };
  // console.log('form values', form.watch());

  return (
    <section className='space-y-8 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/dosageForms' className='space-x-2'>
            <Undo2 />
            <span className='capitalize'>back to dosageForms</span>
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 gap-8'>
            {/* DosageForm Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>dosageForm name</FormLabel>
                  <FormControl>
                    <Input placeholder='dosageForm name...' {...field} />
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
