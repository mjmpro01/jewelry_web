import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths";

import clsx from 'clsx';
import { formatCurrency } from "../../utils/formatText";
import { useCartStore } from "../../store/cart";
import { message } from "antd";

const CartDrawerItem = ({ isInCart, product }) => {
  const navigate = useNavigate();

  const increaseCartProduct = useCartStore(s => s.increaseCartProduct)
  const decreaseCartProduct = useCartStore(s => s.decreaseCartProduct)
  const removeCartProduct = useCartStore(s => s.removeCartProduct)

  return (
    <div
      className={clsx(
        "flex items-start gap-4 py-4",
        isInCart ? 'px-0' : 'px-4'
      )}
    >
      <img
        src={product?.image}
        width={70}
        height={70}
        alt=""
        className="w-[70px] h-auto aspect-square rounded-2xl border cursor-pointer"
        onClick={() => navigate(`${paths.PRODUCTS}/${product?.slug}`)}
      />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <p
            className="text-base font-normal truncate text-black w-[150px] md:w-[200px] cursor-pointer"
            onClick={() => navigate(`${paths.PRODUCTS}/${product?.slug}`)}
          >
            {product?.name}
          </p>
          <p className="text-base font-normal text-red-500">
            {formatCurrency(product?.price)}
          </p>
        </div>
        {isInCart ? (<>
          <p className="text-base font-normal">Số lượng: {product?.quantity}</p>
        </>) : (<div className="flex items-center gap-4">
          <MinusCircleIcon
            className="size-6 cursor-pointer"
            onClick={() => decreaseCartProduct(product)}
          />
          <p className="text-base font-normal text-black">
            {product?.quantity}
          </p>
          <PlusCircleIcon
            className="size-6 cursor-pointer"
            onClick={() => increaseCartProduct(product, 1)}
          />
          <TrashIcon
            className="size-6 cursor-pointer"
            onClick={() => {
              removeCartProduct(product);
              message.success("Đã xoá sản phẩm khỏi giỏ hàng")
            }}
          />

        </div>)}
      </div>
    </div>
  )
}

export default CartDrawerItem