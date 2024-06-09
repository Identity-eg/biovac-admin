import { Loader } from 'lucide-react';
import React from 'react';

export default function LoaderComponent() {
  return (
    <section className='flex items-center justify-center w-full min-h-[calc(100vh-56px)]'>
      <Loader className='animate-spin' size={50} />
    </section>
  );
}
