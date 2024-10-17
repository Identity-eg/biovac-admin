import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  FileTextIcon,
  FolderPenIcon,
  HexagonIcon,
  PencilIcon,
  WallpaperIcon,
} from 'lucide-react';
import parse from 'html-react-parser';
// UI
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import CompanyUploads from './CompanyUploads';
// Utils
import { TCompany } from '@/types/company';

export default function CompanyDetails() {
  const navigate = useNavigate();
  const { name, description, logo, cover } =
    useOutletContext<
      Pick<TCompany, 'name' | 'description' | 'logo' | 'cover'>
    >();

  return (
    <Card className='p-4 space-y-6'>
      <article className='flex items-start gap-x-4'>
        <FolderPenIcon size={26} color='gray' className='shrink-0' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>Company name</h5>
          <p className='text-sm'>{name}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => navigate('/company-profile/edit-name')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-start gap-x-4'>
        <FileTextIcon size={26} color='gray' className='shrink-0' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>Description</h5>
          <p className='text-sm'>{parse(description ?? '')}</p>
        </div>
        <Button
          size='icon'
          variant='ghost'
          className='flex items-center justify-center ms-auto'
          onClick={() => navigate('/company-profile/edit-description')}
        >
          <PencilIcon color='gray' />
        </Button>
      </article>
      <Separator />
      <article className='flex items-start gap-x-4'>
        <HexagonIcon size={26} color='gray' className='shrink-0' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>logo</h5>
          {logo ? <img src={logo} className='object- h-32' /> : '_ _ _'}
        </div>
        <CompanyUploads type='logo' />
      </article>
      <Separator />
      <article className='flex items-start gap-x-4'>
        <WallpaperIcon size={26} color='gray' />
        <div className='space-y-2'>
          <h5 className='text-base font-bold'>cover</h5>
          {cover ? <img src={cover} className='object- h-32' /> : '_ _ _'}
        </div>
        <CompanyUploads type='cover' />
      </article>
    </Card>
  );
}
