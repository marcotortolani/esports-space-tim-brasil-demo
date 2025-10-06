'use client'
import React, { useRef } from 'react'
import { CardGamer } from './CardGamer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Pagination])

// const COLOR_BULLETS = 'white';
// const SIZE_BULLETS = 'default';
const DELAY_PER_VIEW = 4500

export default function SliderGamers({ gamersData, miniCards }) {
  const sliderRef = useRef(0)

  return (
    <div className=" z-30 w-full h-full flex flex-col items-center justify-end overflow-hidden ">
      <Swiper
        ref={sliderRef}
        centeredSlides={miniCards ? false : true}
        loop={true}
        autoplay={{
          delay: DELAY_PER_VIEW,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1920: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          250: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Navigation]}
        navigation={false}
        className="mySwiper w-full h-full overflow-hidden "
      >
        {gamersData &&
          gamersData?.map((gamerData) => (
            <SwiperSlide
              className=" relative pb-4 px-2 lg:px-0 w-full h-full cursor-pointer"
              key={gamerData.id}
            >
              <CardGamer
                path="/gamers"
                gamerData={gamerData}
                miniCard={miniCards}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
