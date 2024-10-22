import { useParams } from "react-router-dom"
import ProductSlider from "../../components/ProductSlider"
import { Button } from 'antd'
import { useEffect, useState } from "react";
import productsApi from "../../apis/products";
import { formatCurrency } from "../../utils/formatText";

const ProductDetail = () => {
  const { slug } = useParams();
  console.log("🚀 ~ file: index.jsx:7 ~ ProductDetail ~ slug:", slug)

  const [product, setProduct] = useState();
  console.log("🚀 ~ file: index.jsx:12 ~ ProductDetail ~ product:", product)

  useEffect(() => {
    const fetchProductDetail = async (slug) => {
      const data = await productsApi.getBySlug(slug).then(res => res?.data?.data)

      setProduct(data)
    }

    if (slug) {
      fetchProductDetail(slug)
    }
  }, [slug])

  return (
    <div className="py-4">
      <div className='flex md:flex-row flex-col items-start gap-4 relative'>
        <ProductSlider product={product} />

        <div className="flex flex-col gap-4 sticky top-4 px-4 w-full">
          <p className="text-xl text-[#003468] font-bold">
            {product?.name}
          </p>
          <p className="text-xl text-[#003468]">
            {formatCurrency(product?.price)}
          </p>
          <p className="text-base text-[#726f6f] italic">
            (Giá sản phẩm thay đổi tùy trọng lượng vàng và đá)
          </p>
          <p className="text-base text-[#726f6f]">
            {product?.description}
          </p>
          <Button type="primary" danger className="w-full">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail