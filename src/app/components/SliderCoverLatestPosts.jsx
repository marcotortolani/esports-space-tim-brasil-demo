import React from 'react'
import { getData, getPostsByCategoryId } from '@/services/api-content'
import { getLatestPosts, cleanDataPosts } from '@/utils/functions'
import SwiperSliderCoverPosts from './SwiperSliderCoverPosts'

export default async function SliderCoverLatestPosts({
  id,
  qty,
  categorySlug,
  styleColor,
}) {
  const { data: tagsData } = await getData('tags')
  const videoTagID = await tagsData.filter((tag) =>
    tag.slug.includes('video')
  )[0].id

  const { data } = await getPostsByCategoryId({ id, tagExclude: videoTagID })

  const latestPosts = cleanDataPosts({
    posts: getLatestPosts({ posts: data, qty: qty }),
    categorySlug,
  })

  return (
    <div className=" w-full h-full  ">
      <SwiperSliderCoverPosts
        posts={latestPosts.sort(() => Math.random() - 0.5)}
        delayPerView={5500}
        colorBullets={'white'}
        sizeBullets={'default'}
      />
    </div>
  )
}
