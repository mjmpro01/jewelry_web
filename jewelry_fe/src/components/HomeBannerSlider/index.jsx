// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { images } from '../../assets/images';

const HomeBannerSlider = () => {

  return (
    <div className='w-full flex flex-col'>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
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
        className="rounded-2xl aspect-[3/1]"
      >
        <SwiperSlide>
          <img src={images.homeBanner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images.homeBanner2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images.homeBanner3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HomeBannerSlider;