import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// UI
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
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import UploadImage from './UploadImage';
// Utils
import { useGetCategories } from '@/apis/categories';
import { APP_COMPANIES, DOSAGE_FORMS } from '@/constants';
import {
  useCreateProduct,
  useUpdateProduct,
  useViewProduct,
} from '@/apis/products';
import { getDirtyFields } from '@/lib/utils';
import WhiteOverlay from '@/lib/whiteOverlay';

const imagesSchema = z.object({
  url: z.string().min(1, { message: 'URL is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  size: z.number().min(1, { message: 'Size is required' }),
});

const productSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  nutritionFacts: z.string().min(1, {
    message: 'Nutrition Facts is required',
  }),
  company: z.enum(APP_COMPANIES, { required_error: 'Company is required' }),
  category: z
    .array(z.object({ name: z.string(), _id: z.string() }))
    .min(1, { message: 'Category is required' }),
  itemForm: z.enum(DOSAGE_FORMS, {
    required_error: 'Dosage Form is required',
  }),
  price: z.coerce
    .number({ invalid_type_error: 'Price is required' })
    .min(1, { message: 'Price must be greater than 0' }),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity is required' })
    .min(1, { message: 'Quantity must be greater than 0' }),
  featured: z.boolean(),
  freeShipping: z.boolean(),
  images: z.array(imagesSchema).min(1, { message: 'Image is required' }),
});

export default function ProductForm() {
  const { productId } = useParams();

  const form = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      name: '',
      description: '',
      nutritionFacts: '',
      company: undefined,
      category: [],
      itemForm: undefined,
      price: 0,
      quantity: 0,
      featured: false,
      freeShipping: false,
      images: [],
    },
    resolver: zodResolver(productSchema),
  });

  const navigate = useNavigate();

  const categoriesQuery = useGetCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const viewProductQuery = useViewProduct({
    id: productId ? productId : undefined,
  });

  useEffect(() => {
    if (viewProductQuery.data) {
      const {
        name,
        description,
        nutritionFacts,
        company,
        itemForm,
        quantity,
        price,
        featured,
        freeShipping,
        images,
        category,
      } = viewProductQuery.data;
      const newValues = {
        name,
        description,
        nutritionFacts,
        company: company,
        category,
        itemForm: itemForm,
        price,
        quantity,
        featured,
        freeShipping,
        images,
      };
      form.reset(newValues);
    }
  }, [viewProductQuery.data]);

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const dirtyValues = getDirtyFields(values, form.formState.dirtyFields);

    const data = {
      ...dirtyValues,
      ...(dirtyValues.category && {
        category: values.category.map((c) => c._id),
      }),
    };
    if (productId) {
      updateProduct.mutate(
        {
          data,
          id: productId,
        },
        {
          onSuccess: () => navigate('/products'),
        }
      );
    } else {
      createProduct.mutate(
        { data },
        {
          onSuccess: () => navigate('/products'),
        }
      );
    }
  };
  // console.log('form values', form.watch());

  return (
    <section className='space-y-8 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button className='space-x-2' onClick={() => navigate(-1)}>
          <Undo2 />
          <span className='capitalize'>back to products</span>
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 relative'
        >
          {viewProductQuery.isLoading && <WhiteOverlay />}
          <div className='grid grid-cols-2 gap-8'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder='product name...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Company */}
            <FormField
              control={form.control}
              name='company'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>company</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a company' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {APP_COMPANIES.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='product description...'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nutrition Facts */}
            <FormField
              control={form.control}
              name='nutritionFacts'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nutrition facts</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='product nutrition Facts...'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category</FormLabel>
                  <ReactSelect
                    {...field}
                    isMulti
                    options={categoriesQuery.data ?? []}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    // theme={(theme) => ({
                    //   ...theme,
                    //   colors: {
                    //     ...theme.colors,
                    //     primary25: 'grey',
                    //     primary: 'black',
                    //   },
                    // })}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dosage Form */}
            <FormField
              control={form.control}
              name='itemForm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>dosage form</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a form' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DOSAGE_FORMS.map((form) => (
                        <SelectItem key={form} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='product price...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Quantity */}
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>quantity</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='product quantity...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Featured */}
            <FormField
              control={form.control}
              name='featured'
              render={({ field }) => (
                <FormItem className='flex items-center gap-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='h-5 w-5'
                    />
                  </FormControl>
                  <FormLabel className='m-0'>featured</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Free Shipping */}
            <FormField
              control={form.control}
              name='freeShipping'
              render={({ field }) => (
                <FormItem className='flex items-center gap-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='h-5 w-5'
                    />
                  </FormControl>
                  <FormLabel>free shipping</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Images */}
            <FormField
              control={form.control}
              name='images'
              render={() => (
                <FormItem>
                  <FormControl>
                    <UploadImage />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={!form.formState.isDirty}>
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
