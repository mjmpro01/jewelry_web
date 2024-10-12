
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths';

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen flex items-center justify-center relative'>
      <div
        className='absolute top-8 left-8 flex items-center gap-3 cursor-pointer group/backBtn'
        onClick={() => navigate(paths.HOME)}
      >
        <ArrowLeftIcon className='size-4 text-blue-500' />
        <p className='italic text-sm font-normal text-blue-500 group-hover/backBtn:underline'>
          Về trang chủ
        </p>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout