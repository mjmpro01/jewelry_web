
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Layout, Menu, theme } from 'antd';
import {
  DollarOutlined,
  FileTextOutlined,
  ProductOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { paths } from '../../../constants/paths';
import { useEffect, useState } from 'react';
import variables from '../../../constants/variables';
import { isTokenExpired } from '../../../apis/axiosClient';

const { Header, Content, Sider } = Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};


const menuItems = [
  // {
  //   key: `${paths.ADMIN}${paths.DASHBOARD}`,
  //   icon: <DashboardOutlined />,
  //   label: 'Bảng điều khiển'
  // },
  {
    key: `${paths.ADMIN}${paths.MANAGE_PRODUCTS}`,
    icon: <ProductOutlined />,
    label: 'Quản lý sản phẩm'
  },
  {
    key: `${paths.ADMIN}${paths.MANAGE_CATEGORIES}`,
    icon: <ProfileOutlined />,
    label: 'Quản lý danh mục'
  },
  {
    key: `${paths.ADMIN}${paths.MANAGE_ORDERS}`,
    icon: <DollarOutlined />,
    label: 'Quản lý đơn hàng'
  },
  {
    key: `${paths.ADMIN}${paths.MANAGE_USERS}`,
    icon: <UserOutlined />,
    label: 'Quản lý User'
  },
  {
    key: `${paths.ADMIN}${paths.MANAGE_BLOGS}`,
    icon: <FileTextOutlined />,
    label: 'Quản lý Blog'
  },
]

const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogOut = () => {
    localStorage.removeItem(variables.ADMIN_ACCESS_TOKEN)
    localStorage.removeItem(variables.ADMIN_REFRESH_TOKEN)
    navigate(`${paths.ADMIN}${paths.LOGIN}`)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem(variables.ADMIN_ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(variables.ADMIN_REFRESH_TOKEN);

    if (!accessToken || isTokenExpired(accessToken)) {
      if (!refreshToken || isTokenExpired(refreshToken)) {
        localStorage.removeItem(variables.ADMIN_ACCESS_TOKEN);
        localStorage.removeItem(variables.ADMIN_REFRESH_TOKEN);
        navigate(`${paths.ADMIN}${paths.LOGIN}`)
      }
    }
  }, [navigate]);

  return (
    <div>
      <Layout hasSider>
        <Sider
          theme="dark"
          style={siderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical w-full p-4 text-white text-center uppercase font-bold text-lg" >
            {collapsed ? "jwr" : "jewelry"}
          </div>
          <Menu
            theme='dark'
            mode="inline"
            // defaultSelectedKeys={['4']}
            selectedKeys={[pathname]}
            items={menuItems}
            style={{ backgroundClip: '#f7f8f9' }}
            onClick={e => navigate(e.key)}
          />
        </Sider>
        <Layout
          style={{
            marginInlineStart: collapsed ? 80 : 200,
            height: '100vh',
          }}
        >
          <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-end px-8'>
            <p className='cursor-pointer text-red-500' onClick={handleLogOut}>
              Đăng xuất
            </p>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              style={{
                padding: 24,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                // height: '100%'
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AdminLayout