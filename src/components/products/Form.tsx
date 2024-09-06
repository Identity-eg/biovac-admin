import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactSelect from 'react-select';
import { z } from 'zod';
import { Loader2Icon, PlusCircle, Trash2Icon, Undo2Icon } from 'lucide-react';
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import VariantForm from './VariantForm';
import VariantItem from './VariantItem';
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
import { useAuthStore } from '@/store/auth';
import { USER_ROLES } from '@/constants';

export default function ProductForm() {
  const { productId } = useParams();
  const user = useAuthStore((state) => state.userData);

  const form = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      description: '',
      nutritionFacts: {
        servingSize: '',
        servingPerContainer: '',
        ingredients: [],
        otherIngredients: [],
      },
      company: user?.company ? user.company._id : '',
      category: [],
      dosageForm: '',
      featured: false,
      variants: [],
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
  const {
    fields: variantsFields,
    append: variantsAppend,
    remove: variantsRemove,
    update: variantsUpdate,
  } = useFieldArray({
    name: 'variants',
    control: form.control,
  });

  useEffect(() => {
    if (viewProductQuery.data) {
      const {
        description,
        nutritionFacts,
        company,
        dosageForm,
        featured,
        category,
        variants,
        directionOfUse,
        warnings,
        storageConditions,
        NFSA_REG_NO,
      } = viewProductQuery.data;
      const newValues = {
        description,
        nutritionFacts,
        company: company._id,
        category,
        dosageForm: dosageForm._id,
        featured,
        variants,
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
  // console.log('form values', form.watch());
  // console.log('form errors', form.formState.errors);

  return (
    <section className='space-y-8 md:w-3/4 3xl:w-3/5 m-auto'>
      <div className='flex justify-between items-center'>
        <Button className='space-x-2' onClick={() => navigate(-1)}>
          <Undo2Icon />
          <span className='capitalize'>back to products</span>
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 relative'
        >
          {viewProductQuery.isLoading && <WhiteOverlay />}
          <Card className='p-6 grid lg:grid-cols-2 gap-x-4 gap-y-6'>
            {/* Company */}
            {user?.role === USER_ROLES.superAdmin && (
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
            )}
            {/* Category */}
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>category</FormLabel>
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
                  <FormLabel className='text-xs'>dosage form</FormLabel>
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
            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='lg:col-span-2'>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Nutrition Facts */}
          <Card>
            <CardHeader>
              <CardTitle>nutration facts</CardTitle>
            </CardHeader>
            <CardContent className='grid lg:grid-cols-2 gap-x-4 gap-y-6'>
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
            </CardContent>
            <div className='space-y-6'>
              {ingredientsFields.length > 0 && (
                <Table>
                  <TableCaption className='mt-0 mb-4'>
                    A list of your product ingrediants.
                  </TableCaption>
                  <TableHeader className='bg-white capitalize text-xs'>
                    <TableRow>
                      <TableHead className=''>Name</TableHead>
                      <TableHead>Amount Per Serving</TableHead>
                      <TableHead>Daily Value</TableHead>
                      <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredientsFields.map((field, index) => (
                      <TableRow key={field.id} className='hover:bg-white'>
                        <TableCell className='font-medium py-0'>
                          <FormField
                            control={form.control}
                            name={`nutritionFacts.ingredients.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className='focus-visible:ring-0 border-none focus-visible:ring-offset-0'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className='py-0'>
                          <FormField
                            control={form.control}
                            name={`nutritionFacts.ingredients.${index}.amountPerServing`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className='focus-visible:ring-0 border-none focus-visible:ring-offset-0'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className='text-right py-0'>
                          <FormField
                            control={form.control}
                            name={`nutritionFacts.ingredients.${index}.dailyValue`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className='focus-visible:ring-0 border-none focus-visible:ring-offset-0'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            onClick={() => {
                              ingredientsRemove(index);
                            }}
                            className='hover:bg-red-50'
                          >
                            <Trash2Icon
                              color='red'
                              strokeWidth='1.5'
                              size={16}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {otherIngredientsFields.length > 0 && (
                <Table>
                  <TableCaption className='mt-0 mb-4'>
                    A list of your product other ingrediants.
                  </TableCaption>
                  <TableHeader className='bg-white capitalize text-xs'>
                    <TableRow>
                      <TableHead className=''>Name</TableHead>
                      <TableHead className=''>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otherIngredientsFields.map((field, index) => (
                      <TableRow key={field.id} className='hover:bg-white'>
                        <TableCell className='font-medium py-1'>
                          <FormField
                            control={form.control}
                            name={`nutritionFacts.otherIngredients.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className='focus-visible:ring-0 border-none focus-visible:ring-offset-0'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            onClick={() => otherIngredientsRemove(index)}
                            className='hover:bg-red-50'
                          >
                            <Trash2Icon
                              color='red'
                              strokeWidth='1.5'
                              size={16}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <CardFooter className='grid lg:grid-cols-2 gap-x-4 gap-y-6'>
              <Button
                type='button'
                variant='secondary'
                className='space-x-4'
                onClick={() =>
                  ingredientsAppend({
                    name: '',
                    amountPerServing: '',
                    dailyValue: '',
                  })
                }
              >
                <PlusCircle />
                <span>Add Ingredients</span>
              </Button>

              <Button
                type='button'
                variant='secondary'
                className='space-x-4'
                onClick={() =>
                  otherIngredientsAppend({
                    name: '',
                  })
                }
              >
                <PlusCircle />
                <span>Add Other Ingredients</span>
              </Button>
              {form.formState.errors.nutritionFacts?.ingredients && (
                <p className='text-sm font-medium text-destructive col-start-1'>
                  {String(
                    form.formState.errors.nutritionFacts.ingredients.message
                  )}
                </p>
              )}
              {form.formState.errors.nutritionFacts?.otherIngredients && (
                <p className='text-sm font-medium text-destructive col-start-2'>
                  {String(
                    form.formState.errors.nutritionFacts.otherIngredients
                      .message
                  )}
                </p>
              )}
            </CardFooter>
          </Card>

          {/* Featured */}
          {/* <Card className='p-6 grid lg:grid-cols-2 gap-x-4 gap-y-6'>
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
          </Card> */}

          {variantsFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>product variants</CardTitle>
              </CardHeader>
              <CardContent
                className='col-span-2 grid gap-12 self-baseline media-md:col-span-1'
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                }}
              >
                {/* <section> */}
                {variantsFields.map((variant, index) => (
                  <VariantItem
                    key={variant.name}
                    {...variant}
                    index={index}
                    removeItem={variantsRemove}
                    updateItem={variantsUpdate}
                  />
                ))}
                {/* </section> */}
              </CardContent>
            </Card>
          )}
          <div className='space-y-2'>
            <VariantForm variantsAppend={variantsAppend} />
            {form.formState.errors.variants && (
              <p className='text-sm font-medium text-destructive col-start-2'>
                {String(form.formState.errors.variants.message)}
              </p>
            )}
          </div>
          <Card>
            <CardContent className='grid lg:grid-cols-2 gap-x-4 gap-y-6 pt-6'>
              {/* Direction Of Use */}
              <FormField
                control={form.control}
                name='directionOfUse'
                render={({ field }) => (
                  <FormItem className='lg:col-span-2'>
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
                  <FormItem className='lg:col-span-2'>
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
                  <FormItem className='lg:col-span-2'>
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
                  <FormItem className=''>
                    <FormLabel>NFSA_REG_NO</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button
            type='submit'
            disabled={
              !form.formState.isDirty ||
              updateProduct.isPending ||
              createProduct.isPending
            }
          >
            {updateProduct.isPending || createProduct.isPending ? (
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
    </section>
  );
}
