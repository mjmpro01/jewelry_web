import { UserIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../constants/paths';
import CartDrawer from '../CartDrawer';
import { useCartStore } from '../../store/cart';
import { Badge } from 'antd';
import { isUserLoggedIn } from '../../utils/auth';
import { useCartDrawerStore } from '../../store/cartDrawer';

const Header = () => {
  const navigate = useNavigate();

  const isOpenCartDrawer = useCartDrawerStore(s => s.isOpenCartDrawer);
  const setIsOpenCartDrawer = useCartDrawerStore(s => s.setIsOpenCartDrawer);
  const cart = useCartStore(s => s.cart)

  const handleOnClickUser = () => {
    if (isUserLoggedIn()) {
      navigate(`${paths.PROFILE}${paths.INFO}`)
      return
    }

    navigate(paths.LOGIN)
    return;
  }

  return (
    <>
      <header>
        <div className="flex items-center justify-between p-4">
          <div className='flex items-center gap-8'>
            <p className="logo text-2xl font-bold cursor-pointer" onClick={() => navigate(paths.HOME)}>
              Jewelry
            </p>

            <p className=" text-md font-semibold cursor-pointer" onClick={() => navigate(paths.PRODUCTS)}>
              Danh sách sản phẩm
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge color='blue' count={cart?.length}>
              <div
                className="p-2 bg-slate-500 rounded-full flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                onClick={() => setIsOpenCartDrawer(true)}
              >
                <ShoppingBagIcon className='size-4 text-white' />
              </div>
            </Badge>

            <div
              className="p-2 bg-slate-500 rounded-full flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
              onClick={handleOnClickUser}
            >
              <UserIcon className='size-4 text-white' />
            </div>
          </div>
        </div>
      </header>

      <CartDrawer
        open={isOpenCartDrawer}
        onClose={() => setIsOpenCartDrawer(false)}
      />
    </>
  )
}

export default Header