import { Button, Drawer, Form, Input, InputNumber, message, Select } from "antd"
import { useEffect, useState } from "react"
import categoriesApi from "../../apis/categories"
import productsApi from "../../apis/products";
import UploadImages from "../UploadImages";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ViewDrawerProduct = ({ open, onClose, product, refetchData, ...rest }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [productData, setProductData] = useState()

  const [categoryOptions, setCategoryOptions] = useState([])

  const { handleSubmit, control, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      const prodData = await productsApi
        .getById(product.id)
        .then(res => res.data.data)

      setProductData(prodData)

      // Convert the image to the correct format for UploadImages
      const imageFileList = prodData.image ? [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: prodData.image,  // Assuming prodData.image contains the image URL
      }] : [];

      // Convert the gallery to the correct format for UploadImages
      const galleryFileList = prodData.gallery.length ? prodData.gallery
        .filter(img => img)
        .map((img, index) => ({
          uid: String(index),
          name: `gallery_image_${index}.png`,
          status: 'done',
          url: img || '',  // Assuming prodData.gallery contains an array of image URLs
        })) : [];

      setValue('id', prodData.id)
      setValue('sku', prodData.sku)
      setValue('name', prodData.name)
      setValue('price', prodData.price)
      setValue('description', prodData.description)
      setValue('stockQuantity', prodData.stockQuantity)
      setValue('categoryId', prodData.categoryId)
      setValue('image', imageFileList)
      setValue('gallery', galleryFileList)
      setValue('slug', prodData.slug)
    }

    if (product?.id) {
      fetchProduct();
    }
  }, [product, setValue]);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      const categories = await categoriesApi.getAll().then(res => res?.data?.data);

      const categoryOptions = categories.map(cat => ({
        label: cat?.name,
        value: cat?.id,
      }))

      setCategoryOptions(categoryOptions)
    }

    fetchCategoryOptions();
  }, [])

  const onFinish = async (values) => {
    setIsSubmitLoading(true);
    await productsApi.update(productData?.id, {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      price: values.price,
      slug: values.slug,
      stockQuantity: values.stockQuantity,
      image: values.image[0],
      gallery: values.gallery,
    }).then(() => {
      setTimeout(async () => {
        setIsSubmitLoading(false);
        setIsEdit(false)
        await refetchData();
        message.success("Sửa thành công")
        onClose();
        return;
      }, 1500)
    }).catch(e => {
      console.log(e);
      setIsSubmitLoading(false);
      return;
    })
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={756}
      destroyOnClose
      {...rest}
    >
      <div className="flex flex-col gap-4">
        <Form
          labelCol={{ span: 4 }}
          onFinish={handleSubmit(onFinish)}
        >
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <Form.Item label="ID" >
                <Input {...field} disabled />
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
            name="sku"
            control={control}
            render={({ field }) => (
              <Form.Item label="SKU" >
                <Input {...field} disabled />
                <ErrorMessage
                  errors={errors}
                  name="sku"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item label="Tên sản phẩm" >
                <Input
                  {...field}
                  disabled={!isEdit}
                />
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
                  disabled={!isEdit}
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
                <InputNumber
                  {...field}
                  disabled={!isEdit}
                />
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
                  disabled={!isEdit}
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
              <Form.Item label="Danh mục" >
                <Select
                  {...field}
                  disabled={!isEdit}
                  onChange={(value) => {
                    console.log(`selected ${value}`)
                  }}
                  options={categoryOptions}
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
                  // disabled={!isEdit}
                  disabled
                  defaultFileList={field.value}
                  onUploadComplete={(fileUrls) => field.onChange(fileUrls[0])}
                />
                <ErrorMessage
                  errors={errors}
                  name="image"
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
              <Form.Item label="Bộ sưu tập" >
                <UploadImages
                  maxCount={6}
                  fieldKey={'file'}
                  // disabled={!isEdit}
                  disabled
                  defaultFileList={field.value}
                  onUploadComplete={(fileUrls) => {
                    field.onChange(fileUrls);
                  }}
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

          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Form.Item label="Slug" >
                <Input
                  {...field}
                  disabled
                />
                <ErrorMessage
                  errors={errors}
                  name="slug"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          <Form.Item>
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
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  )
}

export default ViewDrawerProduct