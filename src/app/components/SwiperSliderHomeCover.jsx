'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import parse from 'html-react-parser'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import ButtonSeePost from './ui/ButtonSeePost'
import PaginationBullets from './ui/PaginationBullets'
import ImageMissing from './ImageMissing'

SwiperCore.use([Pagination])

export default function SwiperSliderHomeCover({
  posts,
  slidesPerView,
  delayPerView,
  spaceBetweenSlides,
  colorBullets,
  sizeBullets,
}) {
  const [indexPag, setIndexPag] = useState(0)
  const [slidePosts, setSlidePosts] = useState([])
  const sliderRef = useRef(0)
  const qtyBullets = Object.keys(posts).length - parseInt(slidesPerView) + 1

  const pagination = {
    clickable: true,
    type: 'custom',
    renderCustom: function (i, className) {
      setIndexPag(className)
      return null
    },
  }

  useEffect(() => {
    if (slidePosts.length === 0) {
      setSlidePosts(posts)
    }
  }, [posts])

  return (
    <div className=" top-0 w-full h-full flex flex-col items-center justify-center">
      <Swiper
        ref={sliderRef}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        spaceBetween={spaceBetweenSlides}
        autoplay={{
          delay: delayPerView,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        pagination={pagination}
        modules={[Autoplay, Navigation]}
        navigation={false}
        className="mySwiper w-full h-full "
      >
        {slidePosts?.map((post, index) => (
          <SwiperSlide
            className={`${
              index === 0 ? '' : ' '
            } w-full min-w-[160px] h-full relative overflow-hidden`}
            key={post.id}
          >
            <div className=" relative mx-auto w-full md:w-[95%] aspect-[5/8] md:aspect-[5/6] xl:aspect-[5/3] flex flex-col items-center justify-center rounded-xl">
              <div className=" -z-10 relative top-0 w-full h-full  overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-4xl ">
                {post.image ? (
                  <Image
                    className={`  relative w-full h-auto lg:w-auto lg:h-full rounded-[inherit]`}
                    src={post.image}
                    as="image"
                    fill
                    priority={index === 0}
                    sizes="(min-width: 180px), 80vw, 100vw"
                    alt={parse(post.title)}
                    style={{
                      objectFit: 'cover',
                      animationDuration: `${delayPerView + 5000}ms`,
                    }}
                  />
                ) : (
                  <ImageMissing />
                )}
              </div>

              <span
                className={`${
                  index % 2 === 0
                    ? 'bg-Primary text-White'
                    : 'bg-Secondary text-Black'
                } absolute top-2 left-2 xs:top-4 xs:left-4 md:top-8 md:left-8  px-4 py-1 text-sm md:text-base uppercase rounded-full`}
              >
                {post.category}
              </span>

              <div className=" absolute bottom-4 md:bottom-6 lg:bottom-8 w-full h-2/3 px-4 flex flex-col items-center justify-end gap-1 xs:gap-5 ">
                <div className=" w-full max-w-[800px] h-fit flex flex-col items-start justify-around gap-0 ">
                  <h2
                    className={
                      ' mb-2 uppercase font-medium pointer-events-none cursor-default line-clamp-2 text-pretty text-lg xs:text-xl md:text-2xl lg:text-3xl text-White text-left  '
                    }
                  >
                    <span className=" px-2 pr-4 bg-Black box-decoration-clone leading-[30px] xs:leading-[40px] md:leading-[50px] ">
                      {parse(post.title)}
                    </span>
                  </h2>
                  <h4
                    className={
                      ' w-5/6 font-medium pointer-events-none cursor-default line-clamp-2 text-base xs:text-lg md:text:xl lg:text-2xl text-Black first-letter:uppercase '
                    }
                  >
                    <span className=" px-3 bg-White/90 box-decoration-clone leading-[1.8rem] xs:leading-[2.1rem] md:leading-[2.3rem] lg:leading-[2.5rem] ">
                      {parse(post.excerpt)}
                    </span>
                  </h4>
                </div>

                <ButtonSeePost
                  text="Ver más"
                  href={`/${post.category}/${post.id}`}
                  style="gradient"
                  size="md"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
