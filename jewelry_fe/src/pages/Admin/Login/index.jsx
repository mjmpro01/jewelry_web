import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { paths } from "../../../constants/paths";
import authApi from "../../../apis/auth";
import variables from "../../../constants/variables";
import { useEffect } from "react";

const LoginAdmin = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem(variables.ADMIN_ACCESS_TOKEN);

  useEffect(() => {
    if (accessToken) {
      navigate(`${paths.ADMIN}${paths.MANAGE_PRODUCTS}`)
    }
  }, [accessToken, navigate])

  const onFinish = async (values) => {
    await authApi.login(values).then(
      res => res?.data?.data
    ).then(
      data => {
        if (data?.roles?.[0] === 'USER') {
          message.error("Không đủ quyền truy cập");
        } else {
          localStorage?.setItem(variables.ADMIN_ACCESS_TOKEN, data.accessToken)
          localStorage?.setItem(variables.ADMIN_REFRESH_TOKEN, data.refreshToken)
          message.success("Đăng nhập thành công")
          setTimeout(() => {
            navigate(`${paths.ADMIN}${paths.MANAGE_PRODUCTS}`)
          }, 2000)
        }
      }
    )
  }

  return (
    <Form
      className="flex flex-col w-[300px]"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        username: 'default-admin',
        password: 'admin-example'
      }}
    >
      <h3
        className="text-center font-bold text-3xl uppercase mb-8 cursor-pointer"
        onClick={() => navigate(paths.HOME)}
      >
        JEWELRY ADMIN
      </h3>
      <Form.Item
        className="flex flex-col gap-2 mb-4"
        label="Email"
        name={'username'}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="flex flex-col gap-2 mb-8"
        label="Mật khẩu"
        name={'password'}
        rules={[{ required: true }]}
      >
        <Input type="password" />
      </Form.Item>

      <Button
        type="primary"
        className="p-2 h-auto mb-4"
        htmlType="submit"
      >
        Đăng nhập
      </Button>

      <p className="text-sm text-center">
        Bạn chưa có tài khoản?{" "}
        <span
          className="font-bold text-blue-500 italic hover:underline cursor-pointer"
          onClick={() => navigate(paths.REGISTER)}
        >
          Đăng ký
        </span>
      </p>
    </Form>
  )
}

export default LoginAdmin