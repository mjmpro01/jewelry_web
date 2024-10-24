import { Empty, message } from "antd"
import { Button, Drawer } from "antd"
import CartDrawerItem from "../CartDrawerItem"
import { Divider } from "antd"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths"
import { useCartStore } from "../../store/cart"
import { isUserLoggedIn } from "../../utils/auth"

const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate()

  const cart = useCartStore((state) => state.cart)

  const handleCheckout = () => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      navigate(paths.CHECKOUT);
      onClose();
      return
    }

    message.warning("Vui lòng đăng nhập để thực hiện thanh toán");
    navigate(paths.LOGIN);
    onClose();
  }

  const FooterCartDrawer = () => {
    return (
      <div className="p-2">
        <Button
          type="primary"
          className="w-full p-2 h-auto"
          onClick={handleCheckout}
          disabled={!cart.length}
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
      {cart?.length ? (
        <div className="h-full overflow-y-auto flex flex-col gap-4">
          {cart?.map((product, index) => (
            <>
              <CartDrawerItem key={index} product={product} />
              <Divider className="my-1" />
            </>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <Empty description={false} />
            <p className="text-base font-normal text-center leading-8 text-[#CCC]">
              Giỏ hàng trống.
              <br />
              Thêm sản phẩm để tiếp tục
            </p>
          </div>
        </div>
      )}
    </Drawer>
  )
}

export default CartDrawer