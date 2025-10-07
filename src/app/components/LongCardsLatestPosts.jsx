'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import parse from 'html-react-parser'

import { getPostsByCategoryId } from '@/services/api-content.js'
import { getLatestPosts, cleanDataPosts } from '@/utils/functions.js'
import ImageMissing from './ImageMissing.jsx'
import ButtonSeePost from './ui/ButtonSeePost.jsx'
import { ArrowLeft } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

//const tagIDVideoPost = 14;

export default function LongCardsLatestPosts({
  id,
  qty,
  categorySlug,
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
    <div className=" w-full h-full flex flex-col items-center justify-center my-2 md:my-6 ">
      {loading ? (
        <div className=" w-full h-full flex items-center justify-center">
          <p className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-Primary">
            {dictionary['Loading']}...
          </p>
        </div>
      ) : (
        <ul className=" w-full px-0 md:px-2 lg:px-0 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-6">
          {posts?.map((post, index) => (
            <li
              key={post.id}
              className={` relative w-full h-[50vh] min-h-[300px] max-h-[350px] md:min-h-[400px] md:max-h-[450px] lg:min-h-[500px] lg:max-h-[600px] p-2 md:p-4 lg:p-4 my-2 mt-0 flex flex-col gap-2 md:gap-4 lg:gap-6 rounded-xl md:rounded-xl lg:rounded-2xl
                
                ${
                  index % 2 === 0
                    ? 'bg-Secondary text-white '
                    : ' bg-Tertiary text-black  '
                }  ${
                index % 3 === 0
                  ? 'md:bg-Secondary text-white '
                  : ' md:bg-Tertiary md:text-black '
              } `}
            >
              <div
                className={`relative w-full h-2/3 overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl`}
              >
                {post?.featuredImage ? (
                  <Image
                    className={` absolute w-full h-full  object-center object-cover rounded-[inherit]`}
                    fill
                    sizes="(max-width: 350px)"
                    src={post?.featuredImage}
                    alt={`Image ${post?.title}`}
                  />
                ) : (
                  <ImageMissing />
                )}
                <div className=" z-50 absolute w-full h-full flex items-center justify-center">
                  <ButtonSeePost
                    text={dictionary['See post']}
                    href={`/${post?.category}/${post?.id}`}
                    style="solidPrimary"
                    size="md"
                  />
                </div>
                <div className=" absolute z-30 bottom-0  bg-black/50 w-full h-full pb-3 px-3 md:pl-4 md:pb-4  flex flex-col justify-end ">
                  <h4
                    className={`text-white font-druk tracking-wider font-semibold line-clamp-1 text-start
                              text-xl md:text-3xl lg:text-5xl `}
                  >
                    {parse(post?.title)}
                  </h4>
                </div>
              </div>

              <div className=" relative h-fit flex flex-col justify-between gap-2 md:gap-2 lg:gap-4 ">
                <p
                  className={` w-full font-montserrat font-medium text-sm md:text-lg lg:text-xl line-clamp-4 md:line-clamp-[6] md:leading-7 lg:line-clamp-[8] lg:leading-8 `}
                >
                  {parse(post?.excerpt)}
                </p>
              </div>
            </li>
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
