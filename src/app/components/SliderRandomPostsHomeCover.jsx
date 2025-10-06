'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { getRandomPosts } from '@/utils/functions'
import SwiperSliderHomeCover from './SwiperSliderHomeCover'

function cleanDataPosts({ posts, catFiltered }) {
  // process the content and return an object with id, title, images array, paragraph excerpt array
  let data = []
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    let imgArray = [],
      pExcerpt = []
    if (!post) continue
    post.excerpt.rendered
      .split('</p>')
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .forEach((paragraph) => {
        pExcerpt.push(paragraph.replace(/<[^>]+>/g, ''))
      })
    post.content.rendered
      .split('</p>')
      .map((item) => item.trim())
      .forEach((element) => {
        if (element.includes('<img')) {
          const image = element.match(/src="(.*?)"/)[1].replaceAll('"', '')
          imgArray.push(image)
        }
        // else if (element !== "") {
        //   pArray.push(element);
        // }
      })

    const findSlugById = (categoryId) => {
      const category = catFiltered.find((cat) => cat.id === categoryId)
      return category ? category.slug : null
    }

    const categoryParent = post.categories
      .map((categoryId) => findSlugById(categoryId))
      .filter(Boolean)

    data.push({
      id: post.id,
      category: categoryParent,
      title: post.title.rendered,
      excerpt: pExcerpt[0],
      image: imgArray[0],
    })
  }

  return data
}

export default function SliderRandomPostsHomeCover({
  posts,
  qty,
  catFiltered,
}) {
  const [randomPosts, setRandomPosts] = useState([])

  useEffect(() => {
    if (!posts) return
    const newRandomPosts = cleanDataPosts({
      posts: getRandomPosts({ posts: posts, qty: qty }),
      catFiltered: catFiltered,
    })

    setRandomPosts(newRandomPosts)
  }, [posts, qty, catFiltered])

  return (
    <div className=" z-20 relative top-0 w-screen overflow-hidden max-w-screen-2xl xs:min-h-[450px]">
      <SwiperSliderHomeCover
        posts={randomPosts}
        slidesPerView={1.5}
        delayPerView={4000}
        spaceBetweenSlides={20}
        colorBullets={'white'}
        sizeBullets={'default'}
      />
    </div>
  )
}
