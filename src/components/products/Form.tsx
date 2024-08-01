import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2Icon, PlusCircle, Trash2Icon, Undo2Icon } from 'lucide-react';
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
import { Checkbox } from '../ui/checkbox';
import UploadImage from './UploadImage';
import VariantUploadImage from './VariantUploadImages';
// import ImagesView from './ImagesView';
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
        ingredients: [],
        otherIngredients: [],
      },
      company: '',
      category: [],
      dosageForm: '',
      price: 0,
      priceAfterDiscount: undefined,
      quantity: 0,
      featured: false,
      images: [],
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
  } = useFieldArray({
    name: 'variants',
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
        unitCount,
        price,
        featured,
        images,
        category,
        variants,
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
        unitCount,
        featured,
        images,
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
                            console.log(index);

                            ingredientsRemove(index);
                          }}
                          className='hover:bg-red-50'
                        >
                          <Trash2Icon color='red' strokeWidth='1.5' size={16} />
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
                          <Trash2Icon color='red' strokeWidth='1.5' size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
            </CardFooter>
          </Card>

          <Card className='p-6 grid lg:grid-cols-2 gap-x-4 gap-y-6'>
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
            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>price</FormLabel>
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
            {/* Price After Discount */}
            <FormField
              control={form.control}
              name='priceAfterDiscount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>
                    price After Discount
                  </FormLabel>
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
                  <FormLabel className='text-xs'>quantity</FormLabel>
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
            {/* Unit Count */}
            <FormField
              control={form.control}
              name='unitCount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>unit count</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='product unit count...'
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
            {/* Images */}
            <FormField
              control={form.control}
              name='images'
              render={() => (
                <FormItem className='lg:col-span-2'>
                  <FormLabel className='text-xs'>images</FormLabel>
                  <FormControl>
                    <UploadImage />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {variantsFields.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>product variants</CardTitle>
              </CardHeader>

              <Table>
                <TableCaption className='mt-0 mb-4'>
                  A list of your product ingrediants.
                </TableCaption>
                <TableHeader className='bg-white capitalize text-xs'>
                  <TableRow>
                    <TableHead className=''>Name</TableHead>
                    <TableHead>Unit Count</TableHead>
                    <TableHead>Flavor</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Price After Discount</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variantsFields.map((field, index) => (
                    <>
                      <TableRow key={field.id} className='hover:bg-white'>
                        <TableCell className='font-medium py-0'>
                          <FormField
                            control={form.control}
                            name={`variants.${index}.name`}
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
                            name={`variants.${index}.unitCount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type='number'
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
                            name={`variants.${index}.flavor`}
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
                            name={`variants.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type='number'
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
                            name={`variants.${index}.priceAfterDiscount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type='number'
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
                            name={`variants.${index}.images`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <VariantUploadImage index={index} />
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
                              console.log(index);

                              variantsRemove(index);
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
                      {/* <article className='w-full col-start-1 col-span-5 grid grid-cols-2 gap-4'>
                        <ImagesView
                          images={form.getValues(`variants.${index}.images`)}
                        />
                      </article> */}
                    </>
                  ))}
                </TableBody>
              </Table>

              <CardFooter>
                <Button
                  type='button'
                  variant='secondary'
                  className='space-x-4'
                  onClick={() =>
                    variantsAppend({
                      name: '',
                      unitCount: 0,
                      flavor: '',
                      price: 0,
                      priceAfterDiscount: 0,
                      images: [],
                    })
                  }
                >
                  <PlusCircle />
                  <span>Add variant</span>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Button
              type='button'
              variant='outline'
              className='space-x-4'
              onClick={() =>
                variantsAppend({
                  name: '',
                  unitCount: 0,
                  flavor: '',
                  price: 0,
                  priceAfterDiscount: 0,
                  images: [],
                })
              }
            >
              <PlusCircle />
              <span>Add variant</span>
            </Button>
          )}

          <Card>
            <CardHeader>
              <CardTitle className='mb-4'>Product Notes</CardTitle>
              <CardContent className='grid lg:grid-cols-2 gap-x-4 gap-y-6 px-0 pb-0'>
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
            </CardHeader>
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
