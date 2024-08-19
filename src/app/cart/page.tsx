import GettingCartProducts from '@/components/GetAllProducts';
import { getServerSession } from 'next-auth';

const CartPage = async () => {
  const session = await getServerSession()
  return (
    <GettingCartProducts user_id={session?.user?.email} />
  );
};

export default CartPage;
