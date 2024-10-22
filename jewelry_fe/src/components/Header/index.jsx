import { UserIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../constants/paths';
import { useState } from 'react';
import CartDrawer from '../CartDrawer';

const Header = () => {
  const navigate = useNavigate();

  const [openCartDrawer, setOpenCartDrawer] = useState(false);

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
            <div
              className="p-2 bg-slate-500 rounded-full flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
              onClick={() => setOpenCartDrawer(true)}
            >
              <ShoppingBagIcon className='size-4 text-white' />
            </div>

            <div
              className="p-2 bg-slate-500 rounded-full flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
              onClick={() => navigate(paths.LOGIN)}
            >
              <UserIcon className='size-4 text-white' />
            </div>
          </div>
        </div>
      </header>

      <CartDrawer
        open={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
      />
    </>
  )
}

export default Header