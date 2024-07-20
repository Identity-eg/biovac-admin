import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trash2Icon, Undo2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import {
  useCreateProduct,
  useUpdateProduct,
  useViewProduct,
} from '@/apis/products';
import { useGetCompanies } from '@/apis/companies';
import { useGetDosageForms } from '@/apis/dosageForm';
import { getDirtyFields } from '@/lib/utils';
import WhiteOverlay from '@/lib/whiteOverlay';
import TiptapEditor from '@/lib/tiptap';
import { productSchema } from './Schema';

export default function ProductForm() {
  const { productId } = useParams();

  const form = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      name: '',
      description: '',
      nutritionFacts: {
        servingSize: '',
        servingPerContainer: '',
        ingredients: [{ name: '', amountPerServing: '', dailyValue: '' }],
        otherIngredients: [{ name: '' }],
      },
      company: '',
      category: [],
      dosageForm: '',
      price: 0,
      quantity: 0,
      featured: false,
      freeShipping: false,
      images: [],
      directionOfUse: '',
      warnings: '',
      storageConditions: '',
      NFSA_REG_NO: '',
    },
    resolver: zodResolver(productSchema),
  });

  const navigate = useNavigate();

  const categoriesQuery = useGetCategories();
  const companiesQuery = useGetCompanies();
  const dosageFormsQuery = useGetDosageForms();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const viewProductQuery = useViewProduct({
    id: productId ? productId : undefined,
  });

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    name: 'nutritionFacts.ingredients',
    control: form.control,
  });
  const {
    fields: otherIngredientsFields,
    append: otherIngredientsAppend,
    remove: otherIngredientsRemove,
  } = useFieldArray({
    name: 'nutritionFacts.otherIngredients',
    control: form.control,
  });
  useEffect(() => {
    if (viewProductQuery.data) {
      const {
        name,
        description,
        nutritionFacts,
        company,
        dosageForm,
        quantity,
        price,
        featured,
        freeShipping,
        images,
        category,
        directionOfUse,
        warnings,
        storageConditions,
        NFSA_REG_NO,
      } = viewProductQuery.data;
      const newValues = {
        name,
        description,
        nutritionFacts,
        company: company._id,
        category,
        dosageForm: dosageForm._id,
        price,
        quantity,
        featured,
        freeShipping,
        images,
        directionOfUse,
        warnings,
        storageConditions,
        NFSA_REG_NO,
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
  console.log('form values', form.watch());

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
          <div className='grid md:grid-cols-2 gap-8'>
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
                      {companiesQuery.data?.companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
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
                <FormItem className='col-span-2'>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nutrition Facts */}
            <article className='col-span-2 space-y-8'>
              <FormLabel>nutration facts</FormLabel>
              <div className='grid sm:grid-cols-2 xl:grid-cols-[1fr,1fr,1fr,80px] gap-8'>
                <FormField
                  control={form.control}
                  name='nutritionFacts.servingSize'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs'>serving size</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='nutritionFacts.servingPerContainer'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs'>
                        serving per container
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=''>
                <FormLabel className='text-xs font-bold'>ingredients</FormLabel>
                {ingredientsFields.map((field, index) => (
                  <div
                    key={field.id}
                    className='grid sm:grid-cols-2 xl:grid-cols-[1fr,1fr,1fr,80px] gap-8 items-end'
                  >
                    <FormField
                      control={form.control}
                      name={`nutritionFacts.ingredients.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs'>name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`nutritionFacts.ingredients.${index}.amountPerServing`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs'>
                            amount per serving
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`nutritionFacts.ingredients.${index}.dailyValue`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs'>daily value</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index === 0 ? (
                      <Button
                        type='button'
                        onClick={() =>
                          ingredientsAppend(
                            {
                              name: '',
                              amountPerServing: '',
                              dailyValue: '',
                            },
                            { shouldFocus: true }
                          )
                        }
                      >
                        add
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        size='icon'
                        variant='ghost'
                        onClick={() => ingredientsRemove(index)}
                        className='hover:bg-red-50'
                      >
                        <Trash2Icon color='red' strokeWidth='1.5' size={20} />
                      </Button>
                    )}
                  </div>
                ))}
                <div className='h-10'></div>
                <FormLabel className='text-xs font-bold'>
                  other ingredients
                </FormLabel>
                {otherIngredientsFields.map((field, index) => (
                  <div
                    key={field.id}
                    className='grid sm:grid-cols-2 xl:grid-cols-[1fr,1fr,1fr,80px] gap-8 items-end'
                  >
                    <FormField
                      control={form.control}
                      name={`nutritionFacts.otherIngredients.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs'>name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index === 0 ? (
                      <Button
                        type='button'
                        onClick={() =>
                          otherIngredientsAppend(
                            {
                              name: '',
                            },
                            { shouldFocus: true }
                          )
                        }
                        className='col-start-4'
                      >
                        add
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        size='icon'
                        variant='ghost'
                        onClick={() => otherIngredientsRemove(index)}
                        className='hover:bg-red-50 col-start-4'
                      >
                        <Trash2Icon color='red' strokeWidth='1.5' size={20} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </article>
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
                    options={categoriesQuery.data?.categories ?? []}
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
              name='dosageForm'
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
                      {dosageFormsQuery.data?.dosageForms.map((form) => (
                        <SelectItem key={form._id} value={form._id}>
                          {form.name}
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
                <FormItem className='col-span-2'>
                  <FormLabel>images</FormLabel>
                  <FormControl>
                    <UploadImage />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Direction Of Use */}
            <FormField
              control={form.control}
              name='directionOfUse'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>direction of use</FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Warnings */}
            <FormField
              control={form.control}
              name='warnings'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>warnings</FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Storage Conditions */}
            <FormField
              control={form.control}
              name='storageConditions'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>storage conditions</FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* NFSA_REG_NO */}
            <FormField
              control={form.control}
              name='NFSA_REG_NO'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>NFSA_REG_NO</FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
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
