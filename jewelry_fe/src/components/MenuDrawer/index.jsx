import { Drawer } from 'antd'
import { isUserLoggedIn } from '../../utils/auth'
import { paths } from '../../constants/paths'
import variables from '../../constants/variables'
import { useNavigate } from 'react-router-dom'
import Search from 'antd/es/transfer/search'

const menuList = [
  {
    title: 'Trang chủ',
    url: paths.HOME
  },
  {
    title: 'Danh sách sản phẩm',
    url: paths.PRODUCTS
  },
]

const authList = [
  {
    title: 'Cá nhân',
    url: `${paths.PROFILE}${paths.INFO}`
  },
  {
    title: 'Đơn hàng',
    url: `${paths.PROFILE}${paths.ORDERS}`
  }
]

const MenuDrawer = ({ open, onClose }) => {
  const navigate = useNavigate()

  const menu = isUserLoggedIn ? [...menuList, ...authList] : [...menuList]

  const handleLogOut = () => {
    localStorage.removeItem(variables.USER_ACCESS_TOKEN)
    localStorage.removeItem(variables.USER_REFRESH_TOKEN)
    localStorage.removeItem(variables.USER_PROFILE)
    navigate(paths.HOME)
  }

  const handleOnSearch = (value) => {
    const searchParams = new URLSearchParams({ "tim-kiem": value })
    navigate(`${paths.SEARCH_RESULT}?${searchParams.toString()}`)
  }

  return (
    <Drawer
      onClose={onClose}
      open={open}
      styles={{
        body: {
          padding: 0
        }
      }}
    >
      <div className='flex flex-col gap-8 p-8'>
        <Search placeholder="input search text" onSearch={handleOnSearch} />
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(item.url)
              onClose()
            }}>
            <p className='uppercase text-base'>
              {item.title}
            </p>
          </div>
        ))}
        {isUserLoggedIn && (
          <div onClick={handleLogOut}>
            <p className='uppercase text-base'>
              Đăng xuất
            </p>
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default MenuDrawer