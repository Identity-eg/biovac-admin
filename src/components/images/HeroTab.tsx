import { IMAGES_PATHS } from '@/constants';
import { useGetImages } from '@/apis/images';
import LoaderComponent from '@/components/ui/loader';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AlbumArtwork } from './components/Album';

export default function Hero() {
  const imagesQuery = useGetImages({ path: IMAGES_PATHS.hero });
  if (imagesQuery.isPending) return <LoaderComponent />;
  if (imagesQuery.isError) return <div>error</div>;
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Hero Section
          </h2>
          <p className='text-sm text-muted-foreground'>
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='relative'>
        <ScrollArea>
          <div className='flex space-x-4 pb-4'>
            {imagesQuery.data.images.map((album) => (
              <AlbumArtwork
                key={album._id}
                album={album}
                className='w-64'
                aspectRatio='portrait'
                width={350}
                height={250}
              />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  );
}
