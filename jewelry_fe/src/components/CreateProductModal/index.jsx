import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd"
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import productsApi from "../../apis/products";
import { useEffect, useState } from "react";
import categoriesApi from "../../apis/categories";
import UploadImages from "../UploadImages";

const CreateProductModal = ({ isModalOpen, handleOk, handleCancle, ...rest }) => {
  const [categoryOptions, setCategoryOptions] = useState([])

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      price: '',
      image: '',
      gallery: [],
    }
  });

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      const categories = await categoriesApi.getAll({}, true).then(res => res?.data?.data);

      const categoryOptions = categories.map(cat => ({
        label: cat?.name,
        value: Number(cat?.id),
      }))

      setCategoryOptions(categoryOptions)
    }

    fetchCategoryOptions();
  }, [])

  const onSubmit = async (data) => {
    const galleryUrls = data.gallery.map(img => {
      if (img?.url) return img.url;
      return img
    })

    const dataSubmit = {
      ...data,
      image: data.image.url,
      gallery: galleryUrls
    }

    const res = await productsApi.create(dataSubmit, true)

    if (res.data) {
      message.success("Tạo thành công")
      handleOk()
    }

    return;
  };

  return (
    <Modal
      title={"Tạo sản phẩm mới"}
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
              <Form.Item label="Tên sản phẩm" >
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
            name="price"
            control={control}
            render={({ field }) => (
              <Form.Item label="Giá" >
                <InputNumber
                  {...field}
                  className="w-full"
                />
                <ErrorMessage
                  errors={errors}
                  name="price"
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

          <Controller
            name="stockQuantity"
            control={control}
            render={({ field }) => (
              <Form.Item label="Số lượng" >
                <InputNumber
                  {...field}
                  className="w-full"
                />
                <ErrorMessage
                  errors={errors}
                  name="stockQuantity"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Form.Item label="Danh mục">
                <Select
                  name="categoryId"
                  options={categoryOptions}
                  {...field}
                />
                <ErrorMessage
                  errors={errors}
                  name="categoryId"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Form.Item label="Ảnh" >
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

          <Controller
            name="gallery"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Bộ sưu tập"
              >
                <UploadImages
                  maxCount={6}
                  multiple
                  fieldKey={'file'}
                  onUploadComplete={(fileUrls) => field.onChange(fileUrls)}
                />
                <ErrorMessage
                  errors={errors}
                  name="gallery"
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

export default CreateProductModal