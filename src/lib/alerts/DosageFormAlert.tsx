import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { useDeleteDosageForm } from '@/apis/dosageForm';

export default function DosageFormAlert({
  id,
  isDosageFormAlertOpened,
  setDosageFormAlert,
}: {
  id: string;
  isDosageFormAlertOpened: boolean;
  setDosageFormAlert: (x: boolean) => void;
}) {
  const deleteDosageForm = useDeleteDosageForm();
  
  function handleDelete() {
    deleteDosageForm.mutate(
      { id },
      {
        onSuccess: (data) => {
          setDosageFormAlert(false);
          toast({
            title: 'Success',
            description: data.msg,
          });
        },
      }
    );
  }

  return (
    <AlertDialog
      open={isDosageFormAlertOpened}
      onOpenChange={setDosageFormAlert}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            disabled={deleteDosageForm.isPending}
            onClick={handleDelete}
          >
            {deleteDosageForm.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
