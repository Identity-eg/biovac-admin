import { CirclePlusIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Hero from './HeroTab';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TPath } from '@/types/image';

export default function ImagesPage() {
  const [tabValue, setTabValue] = useState<TPath | 'footer'>('hero');
  return (
    <Tabs value={tabValue} className='h-full space-y-6'>
      <div className='space-between flex items-center'>
        <TabsList>
          <TabsTrigger value='hero' onClick={() => setTabValue('hero')}>
            Hero
          </TabsTrigger>
          <TabsTrigger value='live' onClick={() => setTabValue('footer')}>
            Footer
          </TabsTrigger>
        </TabsList>
        <div className='ml-auto mr-4'>
          <Button asChild>
            <Link to='create' state={{ path: tabValue }}>
              <CirclePlusIcon className='mr-2 h-4 w-4' />
              <span className='capitalize'>add image</span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value='hero' className='border-none p-0 outline-none'>
        <Hero />
      </TabsContent>
      <TabsContent
        value='podcasts'
        className='h-full flex-col border-none p-0 data-[state=active]:flex'
      >
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              New Episodes
            </h2>
            <p className='text-sm text-muted-foreground'>
              Your favorite podcasts. Updated daily.
            </p>
          </div>
        </div>
        <Separator className='my-4' />
        {/* <PodcastEmptyPlaceholder /> */}
      </TabsContent>
    </Tabs>
  );
}
