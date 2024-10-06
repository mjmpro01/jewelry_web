import { useNavigate } from "react-router-dom"
import { images } from "../../assets/images"
import { paths } from "../../constants/paths"

const ProductCard = () => {
  const navigate = useNavigate()
  return (
    <div
      className="flex flex-col gap-4 cursor-pointer"
      onClick={() => navigate(`${paths.PRODUCTS}/nhan-cuoi-kim-cuong`)}
    >
      <div className="border-[0.5px] border-[#CCC] rounded-2xl">
        <img
          src={images.ring}
          width={600}
          height={600}
          className="aspect-square w-full h-full overflow-hidden hover:scale-110 transition-all"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-base text-center h-12 text-ellipsis line-clamp-2">
          Cặp nhẫn cưới Kim cương Vàng 18K PNJ Vàng Son
        </p>
        <p className="text-sm text-center h-10 truncate text-[#c48c46]">
          24.645.000 ₫
        </p>
      </div>
    </div>
  )
}

export default ProductCard