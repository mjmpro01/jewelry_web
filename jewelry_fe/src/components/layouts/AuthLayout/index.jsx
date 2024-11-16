
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths';
import { ConfigProvider } from 'antd';

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: '#a16207',
            hoverBorderColor: '#a16207',
          },
        },
      }}
    >
      <div className='w-screen h-screen flex items-center justify-center relative bg-yellow-700'>
        <div
          className='absolute top-8 left-8 flex items-center gap-3 cursor-pointer group/backBtn'
          onClick={() => navigate(paths.HOME)}
        >
          <ArrowLeftIcon className='size-4 text-white' />
          <p className='italic text-sm font-normal text-white group-hover/backBtn:underline'>
            Về trang chủ
          </p>
        </div>
        <Outlet />
      </div>
    </ConfigProvider>
  )
}

export default AuthLayout