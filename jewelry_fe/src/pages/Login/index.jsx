import { Button, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths";
import { Controller, useForm } from 'react-hook-form'
import authApi from "../../apis/auth";
import variables from "../../constants/variables";
import usersApi from "../../apis/users";
import { images } from "../../assets/images";

const Login = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (values) => {
    await authApi.login(values).then(
      res => res?.data?.data
    ).then(
      data => {
        localStorage?.setItem(variables.USER_ACCESS_TOKEN, data.accessToken)
        localStorage?.setItem(variables.USER_REFRESH_TOKEN, data.refreshToken)
        message.success("Đăng nhập thành công")
        setTimeout(() => {
          navigate(paths.HOME)
        }, 2000)
      }
    ).then(async () => {
      const userData = await usersApi.me().then(res => res?.data?.data)

      if (userData) {
        localStorage.setItem(variables.USER_PROFILE, JSON.stringify(userData))
      }
    })
  }

  return (
    <div className="flex items-center rounded-lg shadow text-yellow-700 bg-white">
      <img src={images.loginBanner} className="hidden md:block w-[400px] rounded-tl-lg rounded-bl-lg" />
      <div className="flex flex-col w-[400px] p-8">
        <div
          className="flex items-center gap-2 mb-8 cursor-pointer"
          onClick={() => navigate(paths.HOME)}
        >
          <img src={images.logo} className="w-[40px]" />
          <h3 className="text-center font-bold text-3xl uppercase text-yellow-700">
            JEWELRY
          </h3>
        </div>

        <h4 className="uppercase text-4xl mt-4 mb-8 text-yellow-700">
          Đăng nhập ngay bằng tài khoản Jewelry
        </h4>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-base font-semibold">
                  Username
                </p>
                <Input {...field} />
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-base font-semibold">
                  Mật khẩu
                </p>
                <Input type="password" {...field} />
              </div>
            )}
          />

          <Button
            type="primary"
            className="p-2 h-auto mb-4 bg-yellow-700"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
        </form>

        <p className="text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <span
            className="font-bold text-blue-500 italic hover:underline cursor-pointer"
            onClick={() => navigate(paths.REGISTER)}
          >
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login