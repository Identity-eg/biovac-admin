import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '../client';
import { TCompany } from '@/types/company';

// ####################### Get Companies #######################
type GetCompaniesReturnType = {
  companies: TCompany[];
};

const getCompanies = async (): Promise<GetCompaniesReturnType> => {
  const { data } = await request({
    url: `companies`,
    method: 'GET',
  });
  return data;
};
export function useGetCompanies() {
  return useQuery({
    queryKey: ['get-companies'],
    queryFn: getCompanies,
  });
}
// ####################### View Company #######################
type GetCompanyReturnType = {
  company: TCompany;
};
export const viewCompany = async ({
  id,
}: {
  id: string | undefined;
}): Promise<GetCompanyReturnType> => {
  const { data } = await request({
    url: `companies/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewCompany(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-company', props],
    queryFn: () => viewCompany(props),
    select: (data) => data.company,
    enabled: !!props.id,
  });
}

// ####################### Create Company #######################
const createCompany = async ({
  data: companyData,
}: {
  data: { name: string };
}) => {
  const { data } = await request({
    url: `companies`,
    method: 'POST',
    data: companyData,
  });
  return data;
};

export function useCreateCompany() {
  return useMutation({
    mutationFn: createCompany,
  });
}

// ####################### Update Company #######################
const updateCompany = async ({
  data: companyData,
  id,
}: {
  data: Partial<TCompany>;
  id: string;
}) => {
  const { data } = await request({
    url: `companies/${id}`,
    method: 'PATCH',
    data: companyData,
  });
  return data;
};

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompany,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['get-me'] });
    },
  });
}

// ####################### Delete Company #######################
const deleteCompany = async ({
  id,
}: {
  id: string | undefined;
}): Promise<{ msg: string }> => {
  const { data } = await request({
    url: `companies/${id}`,
    method: 'DELETE',
  });
  return data;
};

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({ queryKey: ['get-companies'] });
    },
  });
}
