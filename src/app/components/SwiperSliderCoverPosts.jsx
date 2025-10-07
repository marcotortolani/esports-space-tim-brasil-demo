'use client'
import React from 'react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import parse from 'html-react-parser'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import ButtonSeePost from './ui/ButtonSeePost'
import PaginationBullets from './ui/PaginationBullets'
import ImageMissing from './ImageMissing'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

SwiperCore.use([Pagination])

export default function SwiperSliderCoverPosts({
  posts,
  delayPerView,
  colorBullets,
  sizeBullets,
}) {
  const [indexPag, setIndexPag] = useState(0)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(1)
  const sliderRef = useRef(0)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

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
    <div className=" relative top-0 w-full px-6 md:px-4 h-full flex flex-col items-center justify-center">
      <Swiper
        ref={sliderRef}
        autoplay={{
          delay: delayPerView,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1920: {
            slidesPerView: posts.length > 4 ? 4.2 : 4,
            spaceBetween: 40,
            centeredSlides: false,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 2.6,
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
            centeredSlides: true,
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
        // grabCursor={true}
        // simulateTouch={true}
        pagination={pagination}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        onSwiper={(swiper) => {
          setCurrentSlidesPerView(swiper.params.slidesPerView)
        }}
        onSlideChange={(swiper) => {
          setCurrentSlidesPerView(swiper.params.slidesPerView)
        }}
        className="mySwiper w-[95%] h-full overflow-hidden flex items-center "
      >
        {posts?.map((post, index) => (
          <SwiperSlide
            className={`${
              index === 0 ? '' : ' '
            } w-full min-w-[160px] relative`}
            key={post.id}
          >
            <div
              className={`bg-white text-black z-0 relative mx-auto w-[95%] max-w-[700px]  p-3 pb-4 flex flex-col items-center gap-8  rounded-lg
                xl:w-full  lg:max-w-[500px] aspect-[8/9] md:rounded-xl lg:rounded-2xl`}
            >
              <div className=" z-0 relative top-0 w-full h-full overflow-hidden rounded-[inherit]  ">
                {post?.featuredImage ? (
                  <Image
                    className={` z-0 relative w-full h-auto lg:w-auto lg:h-full object-cover rounded-[inherit]`}
                    src={post?.featuredImage}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 90vw)"
                    alt="Background Image"
                    style={{ animationDuration: `${delayPerView + 5000}ms` }}
                  />
                ) : (
                  <ImageMissing />
                )}
                <div className=" z-20 absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-fit bg-white border-Primary border-[2px] flex items-center justify-center rounded-full">
                  <span className=" bg-Tertiary text-white px-4 py-1.5 h-full rounded-full font-montserrat font-bold text-base md:text-lg lg:text-3xl ">
                    {dictionary['New!']}
                  </span>
                  <h5
                    className={`px-2  font-druk font-bold text-left pointer-events-none cursor-default line-clamp-1 box-decoration-clone
                                text-base md:text-lg lg:text-4xl `}
                  >
                    {parse(post.title)}
                  </h5>
                </div>
              </div>

              <ButtonSeePost
                text={dictionary['See more']}
                href={
                  post.category === '/'
                    ? `/${post.id}`
                    : `/${post.category}/${post.id}`
                }
                style="solidPrimary"
                size="md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" z-30 absolute top-0 -translate-y-10 w-full h-full flex items-center justify-between pointer-events-none ">
        {/* button prev */}
        <button
          ref={prevRef}
          type="button"
          className=" w-10 h-10 text-white disabled:opacity-30 transition-all duration-150 ease-in-out pointer-events-auto "
        >
          <ArrowLeftCircle width="100%" height="100%" />
        </button>

        {/* button next */}
        <button
          ref={nextRef}
          type="button"
          className=" w-10 h-10 text-white disabled:opacity-30 transition-all duration-150 ease-in-out pointer-events-auto"
        >
          <ArrowRightCircle width="100%" height="100%" />
        </button>
      </div>

      <div className=" z-50 relative bottom-0">
        <PaginationBullets
          color={colorBullets}
          size={sizeBullets}
          qtyBullets={qtyBullets}
          index={indexPag}
        />
      </div>
    </div>
  )
}
