import { images } from "../../assets/images"
import HomeBannerSlider from "../../components/HomeBannerSlider"
import ProductCard from "../../components/ProductCard"

const Home = () => {
  return (
    <div className="p-4">
      <div className="mb-4">

        <HomeBannerSlider />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>

      <img
        src={images.homeBanner4}
        width={1500}
        height={500}
        className="w-full h-auto aspect-[3/1] object-cover rounded-2xl"
      />

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>

    </div>
  )
}

export default Home