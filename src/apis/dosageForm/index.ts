import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '../client';
import { TDosageForm } from '@/global';

// ####################### Get DosageForms #######################
type GetDosageFormsReturnType = {
  dosageForms: TDosageForm[];
};

const getDosageForms = async (): Promise<GetDosageFormsReturnType> => {
  const { data } = await request({
    url: `dosage-forms`,
    method: 'GET',
  });
  return data;
};
export function useGetDosageForms() {
  return useQuery({
    queryKey: ['get-dosageForms'],
    queryFn: getDosageForms,
  });
}
// ####################### View DosageForm #######################
type GetDosageFormReturnType = {
  dosageForm: TDosageForm;
};
export const viewDosageForm = async ({
  id,
}: {
  id: string | undefined;
}): Promise<GetDosageFormReturnType> => {
  const { data } = await request({
    url: `dosage-forms/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewDosageForm(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-dosageForm', props],
    queryFn: () => viewDosageForm(props),
    select: (data) => data.dosageForm,
    enabled: !!props.id,
  });
}

// ####################### Create DosageForm #######################
const createDosageForm = async ({
  data: dosageFormData,
}: {
  data: { name: string };
}) => {
  const { data } = await request({
    url: `dosage-forms`,
    method: 'POST',
    data: dosageFormData,
  });
  return data;
};

export function useCreateDosageForm() {
  return useMutation({
    mutationFn: createDosageForm,
  });
}

// ####################### Update DosageForm #######################
const updateDosageForm = async ({
  data: dosageFormData,
  id,
}: {
  data: Record<string, any>;
  id: string | undefined;
}) => {
  const { data } = await request({
    url: `dosage-forms/${id}`,
    method: 'PATCH',
    data: dosageFormData,
  });
  return data;
};

export function useUpdateDosageForm() {
  return useMutation({
    mutationFn: updateDosageForm,
  });
}

// ####################### Delete DosageForm #######################
const deleteDosageForm = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ msg: string }> => {
  const { data } = await request({
    url: `dosage-forms/${id}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteDosageForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosageForm,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({ queryKey: ['get-dosageForms'] });
    },
  });
}
