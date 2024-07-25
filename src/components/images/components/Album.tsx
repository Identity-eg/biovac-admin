import parse from 'html-react-parser';
import { TImage } from '@/global';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PenLineIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import ImageAlert from '@/lib/alerts/ImageAlert';

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: TImage;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const [isImageAlertOpened, setImageAlert] = useState(false);
  return (
    <>
      <div className={cn('space-y-3', className)} {...props}>
        <div className='overflow-hidden rounded-md'>
          <img
            src={album.image[0].url}
            alt={album.image[0].name}
            width={width}
            height={height}
            className={cn(
              'h-auto w-auto object-cover transition-all hover:scale-105',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
            )}
          />
        </div>

        <div className='space-y-1 text-sm'>
          <h3 className='font-medium leading-none'>{album.title}</h3>
          <p className='text-xs text-muted-foreground'>
            {parse(album.description)}
          </p>
        </div>

        <div className='flex justify-between items-center'>
          <Button variant='outline' asChild>
            <Link to={`edit/${album._id}`} className='space-x-2'>
              <PenLineIcon size={16} />
              <span>Edit</span>
            </Link>
          </Button>
          <Button
            size='sm'
            variant='destructive'
            className='space-x-2'
            onClick={() => setImageAlert(true)}
          >
            <Trash2Icon size={16} />
            <span>Delete</span>
          </Button>
        </div>
      </div>
      <ImageAlert
        id={album._id}
        isImageAlertOpened={isImageAlertOpened}
        setImageAlert={setImageAlert}
      />
    </>
  );
}
