'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import CardLastPost from './CardLastPost'

SwiperCore.use([Pagination])

export default function SwiperSliderPosts({ posts, delayPerView, titleOnly }) {
  return (
    <div className=" w-full h-fit  ">
      <Swiper
        centeredSlides={false}
        // autoplay={{
        //   delay: delayPerView,
        //   disableOnInteraction: false,
        // }}
        breakpoints={{
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
        }}
        // pagination={{
        //   clickable: true,
        // }}

        modules={[Autoplay, Navigation]}
        navigation={false}
        className="mySwiper w-full h-full lg:min-h-[250px] overflow-hidden  "
      >
        {posts?.map((post, index) => (
          <SwiperSlide className={` w-full h-fit`} key={post.id}>
            <CardLastPost post={post} index={index} titleOnly={titleOnly} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
