
import Header from '../../Header'
import Footer from '../../Footer'
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='container mx-auto'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootLayout