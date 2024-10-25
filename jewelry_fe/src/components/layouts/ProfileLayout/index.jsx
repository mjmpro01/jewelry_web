import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import { paths } from "../../../constants/paths"
import variables from "../../../constants/variables"

const ProfileLayout = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem(variables.USER_ACCESS_TOKEN)
    localStorage.removeItem(variables.USER_REFRESH_TOKEN)
    localStorage.removeItem(variables.USER_PROFILE)
    navigate(paths.HOME)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] my-4">
      <div className="hidden md:flex flex-col gap-8 items-center border-r">
        <Avatar size={64} icon={<UserOutlined />} />

        <p
          className="cursor-pointer"
          onClick={() => navigate(`${paths.PROFILE}${paths.INFO}`)}
        >
          Thông tin cá nhân
        </p>
        <p
          className="cursor-pointer"
          onClick={() => navigate(`${paths.PROFILE}${paths.ORDERS}`)}
        >
          Đơn hàng
        </p>
        <Button
          className="cursor-pointer"
          onClick={handleLogOut}
          type="primary"
          danger
        >
          Đăng xuất
        </Button>
      </div>

      <div className="px-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout