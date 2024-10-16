import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
// UI
import { Card, CardContent } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// Utils
import { useUpdateUserPassword } from '@/apis/users';

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, {
      message: 'Old password is required',
    }),
    newPassword: z.string().min(1, {
      message: 'New password is required',
    }),
    confirmNewPassword: z.string().min(1, {
      message: 'Confirm new password is required',
    }),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: 'Please make sure 2 passwords are matched',
      path: ['confirmNewPassword'],
    }
  );

export default function PasswordForm() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(passwordSchema),
  });

  const updatePasswordMutation = useUpdateUserPassword();

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    updatePasswordMutation.mutate(
      {
        data: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      },
      { onSuccess: () => navigate('/my-profile') }
    );
  };

  return (
    <Card className='max-w-[662px]'>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-8'
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showOldPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='link'
                        size='icon'
                        className='absolute right-4 top-1/2 -translate-y-1/2'
                        onClick={() => setShowOldPassword((prev) => !prev)}
                      >
                        {showOldPassword ? (
                          <EyeIcon size={20} color='gray' />
                        ) : (
                          <EyeOffIcon size={20} color='gray' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* New Password */}
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='link'
                        size='icon'
                        className='absolute right-4 top-1/2 -translate-y-1/2'
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      >
                        {showNewPassword ? (
                          <EyeIcon size={20} color='gray' />
                        ) : (
                          <EyeOffIcon size={20} color='gray' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm New Password */}
            <FormField
              control={form.control}
              name='confirmNewPassword'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='link'
                        size='icon'
                        className='absolute right-4 top-1/2 -translate-y-1/2'
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <EyeIcon size={20} color='gray' />
                        ) : (
                          <EyeOffIcon size={20} color='gray' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              variant='outline'
              onClick={() => navigate('/my-profile')}
            >
              Canel
            </Button>
            <Button
              type='submit'
              disabled={
                !form.formState.isDirty || updatePasswordMutation.isPending
              }
            >
              {updatePasswordMutation.isPending ? (
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
      </CardContent>
    </Card>
  );
}
