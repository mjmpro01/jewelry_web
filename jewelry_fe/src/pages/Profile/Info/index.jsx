import { Button, Form, Input, message } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"
import variables from "../../../constants/variables";
import usersApi from "../../../apis/users";

const ProfileInfo = () => {
  const userProfile = JSON.parse(localStorage.getItem(variables.USER_PROFILE) || "{}")

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: userProfile?.name || '',
      username: userProfile?.username || '',
      email: userProfile?.email || ''
    }
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onSubmit = async values => {
    setIsSubmitLoading(true);
    await usersApi.update(userProfile?.id, {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      roles: values.roles
    }).then(() => {
      setTimeout(async () => {
        setIsSubmitLoading(false);
        setIsEdit(false)
        const userData = await usersApi.me().then(res => res?.data?.data)

        if (userData) {
          localStorage.setItem(variables.USER_PROFILE, JSON.stringify(userData))
        }

        message.success("Sửa thành công")
        return;
      }, 1500)
    }).catch(e => {
      console.log(e);
      setIsSubmitLoading(false);
      return;
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Form
        labelCol={{ span: 4 }}
        onFinish={handleSubmit(onSubmit)}
      >

        <FormItem label={"Username"}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled
              />
            )}
          />
        </FormItem>

        <FormItem label={"Tên"}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!isEdit}
              />
            )}
          />
        </FormItem>

        <FormItem label={"Email"}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!isEdit}
              />
            )}
          />
        </FormItem>

        <FormItem>
          <div className="flex justify-end w-full">
            {isEdit ? (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsEdit(false)}
                >
                  Huỷ
                </Button>

                <Button
                  // onClick={() => setIsEdit(false)}
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitLoading}
                >
                  Xác nhận
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEdit(true)}
              >
                Sửa
              </Button>
            )}
          </div>
        </FormItem>
      </Form>
    </div>
  )
}

export default ProfileInfo