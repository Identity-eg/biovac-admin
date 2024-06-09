import { Loader } from 'lucide-react';

export default function WhiteOverlay() {
  return (
    <div className='absolute inset-0 z-10 bg-white/60 flex items-center justify-center'>
      <Loader className='animate-spin' />
    </div>
  );
}
