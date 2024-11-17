import { useEffect, useState } from "react"
import { images } from "../../assets/images"
import HomeBannerSlider from "../../components/HomeBannerSlider"
import ProductCard from "../../components/ProductCard"
import productsApi from "../../apis/products"

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths"

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([])
  const [latestProducts, setLastestProducts] = useState([])
  const [topPurchaseProducts, setTopPurchaw] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await productsApi.getAll().then(res => res?.data?.data)
      const latestProducts = await productsApi.getLatest().then(res => res?.data?.data)
      const topPurchaseProducts = await productsApi.getTopPurchase().then(res => res?.data?.data)
      setProducts(products);
      setLastestProducts(latestProducts)
      setTopPurchaw(topPurchaseProducts)
    }

    fetchData()
  }, [])

  return (
    <div className="p-4">
      <div className="mb-4">
        <HomeBannerSlider />
      </div>

      <div className="md:grid md:grid-cols-3 flex items-center overflow-auto md:overflow-hidden gap-2 mb-4">
        <img src={images.miniBanner1} onClick={() => navigate(paths.PRODUCTS)} className="cursor-pointer" />
        <img src={images.miniBanner2} onClick={() => navigate(paths.PRODUCTS)} className="cursor-pointer" />
        <img src={images.miniBanner3} onClick={() => navigate(paths.PRODUCTS)} className="cursor-pointer" />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-[20px] font-normal text-[#003868]">
          Sản phẩm bán chạy
        </h3>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {topPurchaseProducts.slice(0, 8).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} key={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-[20px] font-normal text-[#003868]">
            Sản phẩm mới
          </h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {latestProducts.slice(0, 8).map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} key={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <img
          src={images.homeBanner4}
          width={1500}
          height={500}
          className="w-full h-auto aspect-[3/1] object-cover rounded-2xl mb-4 cursor-pointer"
          onClick={() => navigate(paths.PRODUCTS)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>

        <img
          src={images.homeBanner5}
          width={1500}
          height={500}
          className="w-full h-auto aspect-[3/1] object-cover rounded-2xl mb-4 cursor-pointer"
          onClick={() => navigate(paths.PRODUCTS)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(8, 16).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home