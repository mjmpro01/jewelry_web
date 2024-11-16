import { useNavigate } from "react-router-dom"
import { Button, Input, message } from "antd"
import { paths } from "../../constants/paths";
import { Controller, useForm } from "react-hook-form";
import authApi from "../../apis/auth";
import { images } from "../../assets/images";

const Register = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm();

  const onSubmit = async (values) => {
    await authApi.register(values)

    message.success("Đăng ký thành công")
    navigate(paths.LOGIN)
  }

  return (
    <div className="flex items-center rounded-lg shadow text-yellow-700 bg-white">
      <div className="flex flex-col w-[400px] p-8">
        <h3
          className="text-center font-bold text-3xl uppercase mb-8 cursor-pointer"
          onClick={() => navigate(paths.HOME)}
        >
          JEWELRY
        </h3>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-base font-semibold">
                  Tên người dùng
                </p>
                <Input
                  required
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-base font-semibold">
                  Username
                </p>
                <Input
                  required
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-base font-semibold">
                  Email
                </p>
                <Input
                  required
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-base font-semibold">
                  Mật khẩu
                </p>
                <Input
                  required
                  type="password"
                  {...field}
                />
              </div>
            )}
          />

          <Button
            type="primary"
            className="p-2 h-auto mb-4 bg-yellow-700"
            htmlType="submit"
          >
            Đăng ký
          </Button>
        </form>

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

      <img src={images.registerBanner} className="hidden md:block w-[400px] rounded-tr-lg rounded-br-lg" />
    </div>
  )
}

export default Register