'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Pagination])

import ImageMissing from './ImageMissing'
import { PlayCircleIcon } from 'lucide-react'

export default function SliderMiniVideoPosts({
  sliderElements,
  verticalAspect,
}) {
  const sliderRef = useRef(0)

  return (
    <div className="w-full h-full my-8">
      {sliderElements.length > 0 && (
        <Swiper
          ref={sliderRef}
          centeredSlides={false}
          breakpoints={{
            1024: {
              slidesPerView: sliderElements.length > 4 ? 4.2 : 4,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            320: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
          }}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[Navigation]}
          navigation={false}
          className="mySwiper w-full h-full overflow-hidden "
        >
          {sliderElements?.map((post, i) => (
            <SwiperSlide
              className={` 
              ${
                verticalAspect
                  ? ' aspect-[5/6] md:aspect-[4/3]'
                  : 'aspect-video'
              } w-full h-full relative`}
              key={post.id}
            >
              <Link
                href={`/${post.category}/video/${post.id}`}
                className=" w-full h-full "
              >
                <div
                  className={` relative z-0 w-full h-full border-white border-2  rounded-lg md:rounded-xl overflow-hidden `}
                >
                  {post.images.length > 0 ? (
                    <Image
                      className={` w-full h-auto object-cover rounded-[inherit]`}
                      fill={true}
                      sizes="(max-width: 250px)"
                      src={post.images[0]}
                      alt="Imagen"
                    />
                  ) : (
                    <ImageMissing />
                  )}
                  <div className=" z-20 w-full h-full flex items-center justify-center absolute bottom-0 bg-black/30 rounded-[inherit] ">
                    <PlayCircleIcon
                      color="white"
                      size={verticalAspect ? '30%' : '20%'}
                    />

                    {/* <h3
                    className={` z-10 absolute bottom-2 left-2 md:bottom-4 md:left-4 w-5/6 line-clamp-1 text-start font-medium text-xs sm:text-xs md:text-base lg:text-lg text-white  `}
                  >
                    {post.title}
                  </h3> */}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
