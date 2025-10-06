import React from 'react'
import { getData, getPostsByCategoryId } from '@/services/api-content'
import { getLatestPosts, cleanDataPosts } from '@/utils/functions'
import SwiperSliderPosts from './SwiperSliderPosts'

import dictionary from '@/dictionary/lang.json'

export default async function SliderLatestTricks({ id, qty, categorySlug }) {
  const { data: tagsData } = await getData('tags')
  const videoTagID = await tagsData.filter((tag) =>
    tag.slug.includes('video')
  )[0].id

  const { data } = await getPostsByCategoryId({ id, tagExclude: videoTagID })

  const latestPosts = cleanDataPosts({
    posts: getLatestPosts({ posts: data, qty: qty }),
    categorySlug,
  })

  return latestPosts.length > 0 ? (
    <SwiperSliderPosts
      posts={latestPosts}
      slidesPerView={1}
      centered
      delayPerView={3500}
      spaceBetweenSlides={-20}
      colorBullets={'white'}
      sizeBullets={'default'}
      titleOnly
    />
  ) : (
    <div className=" w-2/3 px-4 py-6 mt-8 text-center rounded-xl text-Black bg-Secondary">
      {dictionary["We're loading content"]}
    </div>
  )
}
