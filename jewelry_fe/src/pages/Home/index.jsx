import { useEffect, useState } from "react"
import { images } from "../../assets/images"
import HomeBannerSlider from "../../components/HomeBannerSlider"
import ProductCard from "../../components/ProductCard"
import productsApi from "../../apis/products"

const Home = () => {
  const [products, setProducts] = useState([])
  const [latestProducts, setLastestProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const products = await productsApi.getAll().then(res => res?.data?.data)
      const latestProducts = await productsApi.getLatest().then(res => res?.data?.data)
      setProducts(products);
      setLastestProducts(latestProducts)
    }

    fetchData()
  }, [])

  return (
    <div className="p-4">
      <div className="mb-4">
        <HomeBannerSlider />
      </div>

      <div className="md:grid md:grid-cols-3 flex items-center overflow-auto md:overflow-hidden gap-2 mb-4">
        <img src={images.miniBanner1} />
        <img src={images.miniBanner2} />
        <img src={images.miniBanner3} />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <h3 className="font-semibold text-xl uppercase">
          Mới nhất
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestProducts.slice(0, 8).map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <h3 className="font-semibold text-xl uppercase">
          Bán chạy
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>

      <img
        src={images.homeBanner4}
        width={1500}
        height={500}
        className="w-full h-auto aspect-[3/1] object-cover rounded-2xl mb-4"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(8, 16).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

    </div>
  )
}

export default Home