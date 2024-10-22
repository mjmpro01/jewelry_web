import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { Navigation, Thumbs } from 'swiper/modules';
import { Image } from 'antd';

export default function ProductSlider({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='max-w-[600px] w-full flex'>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="mySwiper"
        direction="vertical"
        watchSlidesProgress={true}
        watchSlidesVisibility={true}
      >
        {product?.gallery?.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs]}
        className="mySwiper2 flex-1"
        direction="vertical"
      >
        {product?.gallery?.map((img, index) => (
          <SwiperSlide key={index}>
            <Image src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
