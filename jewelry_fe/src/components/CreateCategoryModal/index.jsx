import { Button, Form, Input, message, Modal } from "antd"
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import categoriesApi from "../../apis/categories";

const CreateCategoryModal = ({ isModalOpen, handleOk, handleCancle, ...rest }) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });
  const onSubmit = async (data) => {
    const res = await categoriesApi.create(data)

    if (res.data) {
      message.success("Tạo thành công")
      handleOk()
    }

    return;
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
              <Form.Item label="Tên danh mục" >
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
            name="description"
            control={control}
            render={({ field }) => (
              <Form.Item label="Mô tả" >
                <Input {...field} />
                <ErrorMessage
                  errors={errors}
                  name="description"
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

export default CreateCategoryModal