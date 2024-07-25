import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, Undo2Icon } from 'lucide-react';
import { z } from 'zod';

import { IMAGES_PATHS } from '@/constants';
import {
  useCreateImage,
  useUpdateImage,
  useViewImage,
  viewImage,
} from '@/apis/images';
import {
  filterTruthyValues,
  getDirtyFields,
  unionOfLiterals,
} from '@/lib/utils';
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
import TiptapEditor from '@/lib/tiptap';
import UploadImage from './components/UploadImage';
import { useEffect } from 'react';

const imagesSchema = z.object({
  url: z.string().min(1, { message: 'URL is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  size: z.number().min(1, { message: 'Size is required' }),
});

const imageSchema = z.object({
  image: z.array(imagesSchema).min(1, { message: 'Image is required' }),
  path: unionOfLiterals(Object.values(IMAGES_PATHS)),
  title: z.string(),
  description: z.string(),
  relatedProduct: z.string(),
});

export default function ImageForm() {
  const { imageId, path } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof imageSchema>>({
    defaultValues: {
      image: [],
      path: 'hero',
      title: '',
      description: '',
      relatedProduct: '',
    },
    resolver: zodResolver(imageSchema),
  });

  const viewImageQuery = useViewImage({ id: imageId });
  const createImage = useCreateImage();
  const updateImage = useUpdateImage();

  useEffect(() => {
    if (viewImageQuery.data) {
      const { image, path, title, description, relatedProduct } =
        viewImageQuery.data;
      const newValues = {
        title,
        description,
        image,
        path,
        relatedProduct: relatedProduct?._id ?? '',
      };
      form.reset(newValues);
    }
  }, [viewImageQuery.data]);

  const onSubmit = (values: z.infer<typeof imageSchema>) => {
    const dirtyValues = getDirtyFields(values, form.formState.dirtyFields);

    if (imageId) {
      const data = {
        ...dirtyValues,
      };
      updateImage.mutate(
        {
          data,
          id: imageId,
        },
        {
          onSuccess: () => navigate('/images'),
        }
      );
    } else {
      const data = filterTruthyValues(values);
      createImage.mutate(
        { data },
        {
          onSuccess: () => navigate('/images'),
        }
      );
    }
  };
  console.log('form values', form.watch());

  return (
    <section className='space-y-8 md:w-3/4 m-auto'>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/images' className='space-x-2'>
            <Undo2Icon />
            <span className='capitalize'>back to images</span>
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 relative'
        >
          {/* {viewProductQuery.isLoading && <WhiteOverlay />} */}
          <div className='grid grid-cols-2 gap-8'>
            {/* Name */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    title{' '}
                    <span className='text-xs text-gray-500'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='image title...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Product */}
            <FormField
              control={form.control}
              name='relatedProduct'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    related product{' '}
                    <span className='text-xs text-gray-500'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='paste product ID...' {...field} />
                  </FormControl>
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
                  <FormLabel>
                    description{' '}
                    <span className='text-xs text-gray-500'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <TiptapEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name='image'
              render={() => (
                <FormItem className='col-span-2'>
                  <FormLabel>image</FormLabel>
                  <FormControl>
                    <UploadImage />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            disabled={
              !form.formState.isDirty ||
              // updateProduct.isPending ||
              createImage.isPending
            }
          >
            {/* {updateProduct.isPending || createImage.isPending ? ( */}
            {createImage.isPending ? (
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
