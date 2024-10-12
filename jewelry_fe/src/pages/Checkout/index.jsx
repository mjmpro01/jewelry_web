import { Button, Divider, Input } from "antd"
import CartDrawerItem from "../../components/CartDrawerItem"

const Checkout = () => {
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

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p>
                Họ và tên
              </p>
              <Input />
            </div>

            <div className="flex flex-col gap-2">
              <p>
                Email
              </p>
              <Input />
            </div>

            <div className="flex flex-col gap-2">
              <p>
                Địa chỉ
              </p>
              <Input />
            </div>

            <div className="flex flex-col gap-2">
              <p>
                Số điện thoại
              </p>
              <Input />
            </div>

            <Button type="primary" className="p-2 h-auto">
              Thanh toán
            </Button>

          </div>
        </div>

        <div className="w-[500px] flex flex-col gap-4">
          <p className="text-2xl font-bold">
            Đơn hàng
          </p>
          <Divider className="border-gray-300 mt-0" />

          {Array.from({ length: 5 }).map((_, index) => (
            <>
              <CartDrawerItem key={index} isInCart />
              <Divider className="my-1" />
            </>
          ))}

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">
              Tổng:
            </p>

            <p className="text-2xl font-semibold text-red-500">
              100.000.000 ₫
            </p>
          </div>

        </div>

      </div>
    </div>

  )
}

export default Checkout