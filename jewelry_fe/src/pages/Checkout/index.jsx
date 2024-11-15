import { Button, Divider, Form, Input, message, Select } from "antd"
import CartDrawerItem from "../../components/CartDrawerItem"
import { useCartStore } from "../../store/cart"
import { formatCurrency } from "../../utils/formatText"
import { getUserProfile } from "../../utils/auth"
import { Controller, useForm } from "react-hook-form";
import FormItem from "antd/es/form/FormItem"
import ordersApi from "../../apis/orders"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths"
import { useState } from "react"

const Checkout = () => {
  const navigate = useNavigate();

  const cart = useCartStore(s => s.cart)
  const clearCart = useCartStore(s => s.clearCart)
  const totalPrice = useCartStore(s => s.totalPrice(s))
  const profile = getUserProfile();

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      paymentMethod: 1,
      shippingAddress: ''
    }
  })

  const onSubmit = async (values) => {
    console.log("🚀 ~ file: index.jsx:33 ~ onSubmit ~ values:", values)
    setIsLoading(true)

    const orderItems = cart.map(item => ({
      productId: item?.id,
      quantity: item?.quantity
    }))

    const payload = {
      shippingAddress: values?.shippingAddress,
      orderItems,
      paymentMethod: values.paymentMethod === 1 ? "Thanh toán khi nhận hàng" : "Thanh toán qua VNPAY",
    }

    const res = await ordersApi.create(payload)

    if (res?.data) {
      setTimeout(() => {
        message.success("Đặt hàng thành công")
        clearCart();
        navigate(`${paths.PROFILE}${paths.ORDERS}`)
        setIsLoading(false)
      }, 2000)
    } else {
      setIsLoading(false)
    }

  }

  return (
    <div className="px-4 py-8">
      <div className="flex items-start gap-8">
        <div className="sticky top-4 flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {/* <div className="rounded-full bg-black flex items-center justify-center w-8 h-auto aspect-square">
              <p className="text-base font-normal text-white">
                1
              </p>
            </div> */}
            <p className="text-2xl font-bold">
              Địa chỉ giao hàng
            </p>
          </div>
          <Divider className="border-gray-300 mt-0" />

          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <FormItem label={"Họ và tên"}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled
                    required
                  />
                )}
              />
            </FormItem>

            <FormItem label={"Email"}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled
                    required
                  />
                )}
              />
            </FormItem>

            <FormItem label={"Địa chỉ"}>
              <Controller
                control={control}
                name="shippingAddress"
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                  />
                )}
              />
            </FormItem>

            <FormItem label={"Phương thức thanh toán"}>
              <Controller
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <Select
                    options={[
                      { value: 1, label: "Thanh toán khi nhận hàng" },
                      { value: 2, label: "Thanh toán qua VNPAY" }
                    ]}
                    {...field}
                  />
                )}
              />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                className="p-2 h-auto"
                htmlType="submit"
                loading={isLoading}
              >
                Thanh toán
              </Button>
            </FormItem>
          </Form>
        </div>

        <div className="w-[500px] flex flex-col gap-4">
          <p className="text-2xl font-bold">
            Đơn hàng
          </p>
          <Divider className="border-gray-300 mt-0" />

          {cart.map((product, index) => (
            <>
              <CartDrawerItem key={index} isInCart product={product} />
              <Divider className="my-1" />
            </>
          ))}

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">
              Tổng:
            </p>

            <p className="text-2xl font-semibold text-red-500">
              {formatCurrency(Number(totalPrice))}
            </p>
          </div>

        </div>

      </div>
    </div>

  )
}

export default Checkout