import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths"
import { formatCurrency } from "../../utils/formatText"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div
      className="flex flex-col gap-4 cursor-pointer"
      onClick={() => navigate(`${paths.PRODUCTS}/${product?.slug}`)}
    >
      <div className="border-[0.5px] border-[#CCC] rounded-2xl overflow-hidden">
        <img
          src={product?.image}
          width={600}
          height={600}
          className="aspect-square w-full h-full hover:scale-110 transition-all"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-base text-center h-12 text-ellipsis line-clamp-2">
          {product?.name}
        </p>
        <p className="text-sm text-center h-10 truncate text-[#c48c46]">
          {formatCurrency(product?.price)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard