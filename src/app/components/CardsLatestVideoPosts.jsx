'use client'
import React, { useState, useEffect } from 'react'
import { CardVideo } from './CardVideo'
import { fetchingData } from '@/services/fetchingData'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default function CardsLatestVideosPosts({ id, qty = 4, categorySlug }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
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
        const { cardPosts, pages } = await fetchingData({
          id,
          categorySlug,
          qty: qty,
          page: page,
        })

        setPosts(cardPosts)
        setTotalPages(parseInt(pages))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, categorySlug, qty, page])

  return posts.length > 0 ? (
    <div className=" w-full h-full flex flex-col items-center">
      <ul
        className={`w-full h-fit  lg:my-2 grid grid-cols-5 gap-3 md:gap-5 lg:gap-8 select-none`}
        style={{ gridAutoRows: '1fr' }}
      >
        {posts?.slice(0, qty)?.map((post, index) => {
          const colSpan =
            index % 4 === 0 || index % 4 === 3
              ? ' col-span-2 bg-Primary'
              : ' col-span-3 bg-Tertiary'
          return (
            <li
              key={post.id}
              className={`${colSpan}  w-full h-full md:aspect-[16/9] lg:aspect-[10/5] xl:aspect-[10/4] p-1.5 relative flex flex-col items-center justify-center rounded-lg md:rounded-xl`}
            >
              <CardVideo
                post={post}
                index={index}
                href={`/${categorySlug}/video/${post.id}`}
              />
            </li>
          )
        })}
      </ul>
      {loading && (
        <div className=" w-full h-full flex justify-center text-Primary animate-pulse font-mono tracking-widest text-lg md:text-xl lg:text-2xl">
          {dictionary['Loading']}...
        </div>
      )}
      {totalPages > 1 && (
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
  ) : null
}
