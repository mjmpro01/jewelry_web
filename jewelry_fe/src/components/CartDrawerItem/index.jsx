import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { images } from "../../assets/images"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths";

import clsx from 'clsx';

const CartDrawerItem = ({ isInCart }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex items-start gap-4 py-4",
        isInCart ? 'px-0' : 'px-4'
      )}
      onClick={() => navigate(`${paths.PRODUCTS}/nhan-cuoi-kim-cuong`)}
    >
      <img
        src={images.ring}
        width={70}
        height={70}
        alt=""
        className="w-[70px] h-auto aspect-square rounded-2xl border"
      />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <p className="text-base font-normal truncate text-black w-[200px]">
            Cặp nhẫn cưới Kim cương Vàng 18K PNJ Vàng Son
          </p>
          <p className="text-base font-normal text-red-500">
            24.643.000 ₫
          </p>
        </div>
        {isInCart ? (<>
          <p className="text-base font-normal">Số lượng: 1</p>
        </>) : (<div className="flex items-center gap-4">
          <MinusCircleIcon className="size-6 cursor-pointer" />
          <p className="text-base font-normal text-black">
            1
          </p>
          <PlusCircleIcon className="size-6 cursor-pointer" />
          <TrashIcon className="size-6 cursor-pointer" />

        </div>)}
      </div>
    </div>
  )
}

export default CartDrawerItem