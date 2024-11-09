
import Header from '../../Header'
import Footer from '../../Footer'
import { Outlet } from 'react-router-dom';
import { FloatButton } from 'antd';
import { images } from '../../../assets/images';

const RootLayout = () => {
  return (
    <div className='container mx-auto'>
      <Header />
      <Outlet />
      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        <FloatButton
          icon={
            <a href='https://www.facebook.com/profile.php?id=100010580581303'>
              <img src={images.messenger} className='w-full' />
            </a>
          }
        />
        <FloatButton
          icon={
            <a href='tel:0869164497'>
              <img src={images.phone} className='w-full' />
            </a>}
        />
        <FloatButton
          icon={
            <a href='https://zalo.me/0869164497'>
              <img src={images.zalo} className='w-full'
              />
            </a>
          }
        />
      </FloatButton.Group>
      <Footer />
    </div>
  )
}

export default RootLayout