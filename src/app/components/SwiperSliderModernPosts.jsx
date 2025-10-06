'use client'
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import PaginationBullets from './ui/PaginationBullets'
import CardLastModernPost from './CardLastModernPost'

SwiperCore.use([Pagination])

export default function SwiperSliderModernPosts({
  posts,
  delayPerView,
  colorBullets,
  sizeBullets,
  titleOnly,
  paginationHide,
}) {
  const [indexPag, setIndexPag] = useState(0)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(1)
  const sliderRef = useRef(0)

  const qtyBullets =
    Object.keys(posts).length - parseInt(currentSlidesPerView) + 1

  const pagination = {
    clickable: true,
    type: 'custom',
    renderCustom: function (i, className) {
      setIndexPag(className)
      return null
    },
  }

  return (
    <div className=" w-full h-fit space-y-2  ">
      <Swiper
        ref={sliderRef}
        autoplay={{
          delay: delayPerView,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 30,
            centeredSlides: false,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
            centeredSlides: false,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: false,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
          },
        }}
        // pagination={{
        //   clickable: true,
        // }}
        pagination={pagination}
        modules={[Autoplay, Navigation]}
        navigation={false}
        className="mySwiper w-full h-full "
        onSwiper={(swiper) => {
          setCurrentSlidesPerView(swiper.params.slidesPerView)
        }}
        onSlideChange={(swiper) => {
          setCurrentSlidesPerView(swiper.params.slidesPerView)
        }}
      >
        {posts?.map((post, i) => (
          <SwiperSlide className={` w-full h-fit `} key={post.id}>
            <CardLastModernPost post={post} titleOnly={titleOnly} i={i} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!paginationHide && (
        <PaginationBullets
          color={colorBullets}
          size={sizeBullets}
          qtyBullets={qtyBullets}
          index={indexPag}
        />
      )}
    </div>
  )
}
