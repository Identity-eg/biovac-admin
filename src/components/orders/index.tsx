// UI
import AllOrders from './AllOrders';
import CompanyOrders from './CompanyOrders';
// Utils
import { USER_ROLES } from '@/constants';
import { useGetMe } from '@/apis/users';
import LoaderComponent from '../ui/loader';

export default function OrdersPage() {
  const getMeQuery = useGetMe();
  if (getMeQuery.isPending) return <LoaderComponent />;
  if (getMeQuery.isError) return <div>error</div>;
  return getMeQuery.data.role === USER_ROLES.superAdmin.value ? (
    <AllOrders />
  ) : (
    <CompanyOrders />
  );
}
