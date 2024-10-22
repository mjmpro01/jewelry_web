import { Button, Form, Input, Modal, Select } from "antd"
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { roleOptions } from "../../constants/roles";

const CreateUserModal = ({ isModalOpen, handleOk, handleCancle, ...rest }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    console.log("🚀 ~ file: index.jsx:10 ~ onSubmit ~ data:", data)
    // const res = await usersApi.create(data)

    // if (res.data) {
    //   message.success("Tạo thành công")
    //   handleOk()
    // }

    // return;
  };

  return (
    <Modal
      title={"Tạo danh mục mới"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancle}
      footer={null}
      centered
      destroyOnClose
      {...rest}
    >
      <div>
        <Form
          onFinish={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item label="Tên user" >
                <Input {...field} />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Form.Item label="Username" >
                <Input {...field} />
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item label="Email" >
                <Input {...field} />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Form.Item label="Password" >
                <Input type="password" {...field} />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <Form.Item label="Role" >
                <Select
                  onChange={(value) => {
                    console.log(`selected ${value}`)
                  }}
                  options={roleOptions}
                  mode="multiple"
                  allowClear
                  {...field}
                />
                <ErrorMessage
                  errors={errors}
                  name="roles"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Form.Item className="flex justify-end w-full">
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default CreateUserModal