import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd"
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { useEffect, useState } from "react";
import productsApi from "../../apis/products";
import ordersApi from "../../apis/orders";
import usersApi from "../../apis/users";

const CreateOrderModal = ({ isModalOpen, handleOk, handleCancle, ...rest }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [fields, setFields] = useState([{ productId: '', quantity: 1 }]);
  const [productOptions, setProductOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])

  const addRow = () => {
    setFields([...fields, { productId: '', quantity: 1 }]);
  };

  const removeRow = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const onSubmit = async (data) => {
    const result = fields.map((field, index) => ({
      productId: data[`product_${index}`],
      quantity: data[`quantity_${index}`],
    }));

    const createData = {
      shippingAddress: data?.shippingAddress,
      orderItems: result,
      paymentMethod: "Thanh toán khi nhận hàng",
      userId: data?.userId,
    }

    const res = await ordersApi.create(createData, true)

    if (res.data) {
      message.success("Tạo thành công")
      handleOk()
    }

    return;
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const productData = await productsApi.getAll({}, true).then(res => res?.data?.data)
      const userData = await usersApi.getAll({}, true).then(res => res?.data?.data)

      const productOptions = productData?.map((product) => ({
        label: product.name,
        value: product.id
      }))

      const userOptions = userData?.map((user) => ({
        label: user.name,
        value: user.id
      }))

      setProductOptions(productOptions)
      setUserOptions(userOptions)
    }

    fetchOptions();
  }, [])

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
        >

          <Form.Item className="w-[250px]">
            <Controller
              name={`userId`}
              control={control}
              className='w-full'
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    placeholder="Khách hàng"
                    options={userOptions}
                    className="w-full"
                  >
                  </Select>
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <p>{message}</p>}
                  />
                </>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Item>

          <Controller
            name="shippingAddress"
            control={control}
            render={({ field }) => (
              <Form.Item label="Địa chỉ nhận hàng" >
                <Input {...field} />
                <ErrorMessage
                  errors={errors}
                  name="shippingAddress"
                  render={({ message }) => <p>{message}</p>}
                />
              </Form.Item>
            )}
            rules={{
              required: true
            }}
          />

          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-4">
              <Form.Item className="w-[250px]">
                <Controller
                  name={`product_${index}`}
                  control={control}
                  defaultValue={field.productId}
                  className='w-full'
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        placeholder="Chọn sản phẩm"
                        options={productOptions}
                        className="w-full"
                      >
                      </Select>
                      <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p>{message}</p>}
                      />
                    </>
                  )}
                  rules={{
                    required: true
                  }}
                />
              </Form.Item>

              <Form.Item style={{ width: 100, marginRight: 8 }}>
                <Controller
                  name={`quantity_${index}`}
                  control={control}
                  defaultValue={field.quantity}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <InputNumber {...field} min={1} placeholder="Số lượng" />
                  )}
                />
              </Form.Item>

              {index > 0 && (
                <Button type="link" danger onClick={() => removeRow(index)}>
                  Xoá
                </Button>
              )}

            </div>

          ))}
          <button onClick={addRow}>Thêm sản phẩm</button>

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

export default CreateOrderModal