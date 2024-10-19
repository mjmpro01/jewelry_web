import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { paths } from "../../../constants/paths";
import authApi from "../../../apis/auth";
import variables from "../../../constants/variables";
import { useEffect } from "react";

const LoginAdmin = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem(variables.ACCESS_TOKEN);

  useEffect(() => {
    if (accessToken) {
      navigate(`${paths.ADMIN}${paths.DASHBOARD}`)
    }
  }, [accessToken, navigate])

  const onFinish = async (values) => {
    await authApi.login(values).then(
      res => res?.data?.data
    ).then(
      data => {
        localStorage?.setItem(variables.ACCESS_TOKEN, data.accessToken)
        localStorage?.setItem(variables.REFRESH_TOKEN, data.refreshToken)
        message.success("Đăng nhập thành công")
        setTimeout(() => {
          navigate(`${paths.ADMIN}${paths.DASHBOARD}`)
        }, 2000)
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
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 8,
          offset: 8,
        }}
      >
        <Button
          type="primary"
          className="p-2 h-auto"
          htmlType="submit"
        >
          Đăng nhập
        </Button>
      </Form.Item>
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