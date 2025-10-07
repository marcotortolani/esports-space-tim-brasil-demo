'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPostsByCategoryId } from '@/services/api-content.js'
import { getLatestPosts, cleanDataPosts } from '@/utils/functions.js'

import ImageMissing from './ImageMissing.jsx'
import { ArrowLeft } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default function ShortCardsLatestPosts({
  id,
  qty,
  categorySlug,
  miniCard,
  tagExclude = 72,
  paginationHide = false,
}) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    if (!id || !categorySlug) return
    setLoading(true)

    const fetchData = async () => {
      try {
        const { data, pages } = await getPostsByCategoryId({
          id,
          page,
          tagExclude,
          perPage: qty,
        })

        const postsCleaned = cleanDataPosts({
          posts: getLatestPosts({ posts: data, qty: qty }),
          categorySlug: categorySlug,
        })

        setPosts(postsCleaned)
        setTotalPages(parseInt(pages))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, categorySlug, qty, page])

  return (
    <div className=" w-full h-full md:mt-4 flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4  ">
      {loading ? (
        <div className=" w-full h-full flex items-center justify-center">
          <p className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-Primary">
            {dictionary['Loading']}...
          </p>
        </div>
      ) : (
        <ul className=" w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 ">
          {posts?.map((post, i) => (
            <ShortestCard
              key={post.id}
              i={i}
              post={post}
              miniCard={miniCard}
              categorySlug={categorySlug}
            />
          ))}
        </ul>
      )}
      {totalPages > 1 && !paginationHide && (
        <div className=" w-full px-4 md:max-w-[600px] lg:max-w-[800px] mt-4 flex justify-between  ">
          <button
            type="button"
            disabled={page === 1}
            className=" bg-PrimaryDark p-1 disabled:opacity-50 text-base md:text-lg lg:text-xl text-White uppercase font-normal text-center rounded-full"
            onClick={handlePrevPage}
          >
            <ArrowLeft className=" w-6 h-6" />
          </button>
          <span className="  text-base md:text-lg lg:text-xl text-White uppercase font-montserrat font-medium text-center">
            {dictionary['Page']} {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            className=" bg-PrimaryDark p-1 disabled:opacity-50 text-base md:text-lg lg:text-xl text-White uppercase font-normal text-center rounded-full"
            onClick={handleNextPage}
          >
            <ArrowRight className=" w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}

function ShortestCard({ i, post, miniCard, categorySlug }) {
  return (
    <li
      className={` ${
        i % 2 === 0
          ? ' bg-Tertiary lg:bg-Tertiary '
          : 'bg-Primary lg:bg-Primary '
      } ${
        i % 3 === 0 ? ' md:bg-Tertiary ' : ' md:bg-Primary '
      }  col-span-1 lg:col-span-1 relative w-full aspect-[16/9] mt-0 p-2 rounded-md md:rounded-md lg:rounded-lg `}
    >
      <Link href={`/${categorySlug}/${post.id}`}>
        <div
          className={`${
            miniCard ? '  ' : ''
          } relative w-full h-full  rounded-[inherit]`}
        >
          {post?.featuredImage ? (
            <Image
              className={`  w-full h-full  object-center object-cover  rounded-[inherit]`}
              fill={true}
              sizes="(max-width: 350px)"
              src={post?.featuredImage}
              alt={`Image ${post.title}`}
            />
          ) : (
            <ImageMissing />
          )}
        </div>
      </Link>
    </li>
  )
}
