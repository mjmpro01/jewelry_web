import { Button, Form, Input, message, Modal } from "antd"
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import TextEditor from "../TextEditor";
import { useState } from "react";
import blogsApi from "../../apis/blogs";
import UploadImages from "../UploadImages";

const CreateBlogModal = ({ isModalOpen, handleOk, handleCancle, ...rest }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [contentValue, setContentValue] = useState('');

  const onSubmit = async (data) => {
    if (!contentValue) {
      message.error("Chưa nhập nội dung blog!");
      return;
    }

    const createData = {
      title: data?.title,
      thumbnail: data?.thumbnail.url,
      content: contentValue,
    }

    const res = await blogsApi.create(createData, true)

    if (res.data) {
      message.success("Tạo thành công")
      handleOk()
    }

    return;
  };

  return (
    <Modal
      title={"Tạo đơn hàng mới"}
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
          layout="vertical"
        >

          <Controller
            name={`title`}
            control={control}
            className='w-full'
            render={({ field }) => (
              <Form.Item label="Tên blog" required>
                <>
                  <Input {...field} />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => <p>{message}</p>}
                  />
                </>
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <Form.Item label="Ảnh thubnail" >
                <UploadImages
                  maxCount={1}
                  fieldKey={'file'}
                  onUploadComplete={(fileUrls) => field.onChange(fileUrls[0])}
                />
                <ErrorMessage
                  errors={errors}
                  name="file"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Form.Item label="Nội dung" required>
            <TextEditor
              contentValue={contentValue}
              setContentValue={setContentValue}
            />
            <ErrorMessage
              errors={errors}
              name="content"
              render={({ message }) => <p>{message}</p>}
            />
          </Form.Item>

          <div className="flex justify-end w-full">
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default CreateBlogModal