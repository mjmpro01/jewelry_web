import { Button, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[300px]">
      <h3
        className="text-center font-bold text-3xl uppercase mb-8 cursor-pointer"
        onClick={() => navigate(paths.HOME)}
      >
        JEWELRY
      </h3>
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-base font-semibold">
          Email
        </p>
        <Input />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <p className="text-base font-semibold">
          Mật khẩu
        </p>
        <Input />
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <p className="text-base font-semibold">
          Nhập lại mật khẩu
        </p>
        <Input />
      </div>

      <Button type="primary" className="p-2 h-auto mb-4">
        Đăng ký
      </Button>
      <p className="text-sm text-center">
        Bạn đã có tài khoản?{" "}
        <span
          className="font-bold text-blue-500 italic hover:underline cursor-pointer"
          onClick={() => navigate(paths.LOGIN)}
        >
          Đăng nhập
        </span>
      </p>
    </div>
  )
}

export default Register