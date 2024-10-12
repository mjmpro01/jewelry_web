// import { Empty } from "antd"
import { Button, Drawer } from "antd"
import CartDrawerItem from "../CartDrawerItem"
import { Divider } from "antd"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths"



const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate()

  const FooterCartDrawer = () => {
    return (
      <div className="p-2">
        <Button
          type="primary"
          className="w-full p-2 h-auto"
          onClick={() => {
            navigate(paths.CHECKOUT);
            onClose();
          }}
        >
          Tiến hành thanh toán
        </Button>
      </div>
    )
  }

  return (
    <Drawer
      title="Giỏ hàng của tôi"
      onClose={onClose}
      open={open}
      width={500}
      footer={<FooterCartDrawer />}
      styles={{
        body: {
          padding: 0
        }
      }}
    >
      {/* <div className="h-full flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <Empty description={false} />
          <p className="text-base font-normal text-center leading-8 text-[#CCC]">
            Giỏ hàng trống.
            <br />
            Thêm sản phẩm để tiếp tục
          </p>
        </div>
      </div> */}
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <>
            <CartDrawerItem key={index} />
            <Divider className="my-1" />
          </>
        ))}
      </div>
    </Drawer>
  )
}

export default CartDrawer