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
  useCreateCategory,
  useUpdateCategory,
  useViewCategory,
} from '@/apis/categories';

const categorySchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export default function CategoryForm() {
  const { categoryId } = useParams();

  const form = useForm<z.infer<typeof categorySchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(categorySchema),
  });

  const navigate = useNavigate();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const viewCategoryQuery = useViewCategory({
    id: categoryId ? categoryId : undefined,
  });

  useEffect(() => {
    if (viewCategoryQuery.data) {
      const { name } = viewCategoryQuery.data;
      const newValues = {
        name,
      };
      form.reset(newValues);
    }
  }, [viewCategoryQuery.data]);

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    if (categoryId) {
      updateCategory.mutate(
        {
          data: values,
          id: categoryId,
        },
        {
          onSuccess: () => navigate('/categories'),
        }
      );
    } else {
      createCategory.mutate(
        {
          data: values,
        },
        {
          onSuccess: () => navigate('/categories'),
        }
      );
    }
  };
  // console.log('form values', form.watch());

  return (
    <section className='space-y-8 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/categories' className='space-x-2'>
            <Undo2 />
            <span className='capitalize'>back to categories</span>
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 gap-8'>
            {/* Category Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category name</FormLabel>
                  <FormControl>
                    <Input placeholder='category name...' {...field} />
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
