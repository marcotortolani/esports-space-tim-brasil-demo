import React from 'react'
import { getPostsByCategoryId } from '@/services/api-content'
import { getLatestPosts, cleanDataPosts } from '@/utils/functions'
import SwiperSliderModernPosts from './SwiperSliderModernPosts'

export default async function SliderLatestModernPosts({
  id,
  qty,
  categorySlug,
  paginationHide,
}) {
  const { data } = await getPostsByCategoryId({ id })

  const latestPosts = cleanDataPosts({
    posts: getLatestPosts({ posts: data, qty: qty }),
    categorySlug,
  })

  return (
    <SwiperSliderModernPosts
      posts={latestPosts}
      delayPerView={3500}
      colorBullets={'white'}
      sizeBullets={'default'}
      paginationHide={paginationHide}
      titleOnly
    />
  )
}
