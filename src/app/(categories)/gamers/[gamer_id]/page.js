'use client'
import React, { useState, useEffect } from 'react'
import {
  getCategoryNameById,
  getPostsByPageByCategoryId,
} from '@/services/api-content'
import { TitleSection } from '@/app/components/ui/TitleSection'
import { CardVideo } from '@/app/components/CardVideo'
import { cleanDataPosts } from '@/utils/functions'
import { ArrowLeft } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default function page({ params }) {
  const { gamer_id } = params
  const [gamerPosts, setGamerPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [gamerName, setGamerName] = useState('')
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
    if (!gamer_id) return
    setIsLoading(true)
    async function fetchData() {
      const name = await getCategoryNameById(gamer_id)

      const { data, pages } = await getPostsByPageByCategoryId({
        id: gamer_id,
        page: page,
        perPage: 12,
      })

      if (data) {
        const dataCleaned = cleanDataPosts({
          posts: data,
          categorySlug: 'gamers',
        })
        setGamerPosts(dataCleaned)
      }

      setGamerName(name)
      setTotalPages(parseInt(pages))
      setIsLoading(false)
    }
    fetchData()
  }, [gamer_id, page])

  return (
    <main className=" z-0 relative w-full h-full min-h-[50vh] mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 flex flex-col items-center gap-2 ">
      <div className=" w-full flex flex-col items-center">
        {gamerName && (
          <TitleSection
            title={gamerName}
            outline
            borderColor="px-8 border-Primary"
          />
        )}
        {!isLoading && gamerPosts.length ? (
          <ul className=" w-full h-fit px-4 py-4 md:px-8 lg:my-4 grid grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-3 md:gap-5 lg:gap-6 select-none">
            {gamerPosts?.map((post) => (
              <li
                key={post.id}
                className={`${
                  gamerPosts && gamerPosts?.length === 1
                    ? 'w-full md:w-3/5 lg:w-1/2 mx-auto col-span-2 lg:col-span-3'
                    : 'w-full col-span-1'
                } h-full row-span-1 relative flex flex-col items-center justify-center border-2 border-Secondary overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl`}
              >
                <CardVideo
                  post={post}
                  href={`/gamers/${gamer_id}/video/${post.id}`}
                />
              </li>
            ))}
          </ul>
        ) : null}

        {isLoading && !gamerPosts.length && (
          <div
            className="relative inline-block h-8 w-8 lg:w-12 lg:h-12 my-8 lg:my-12 animate-spin rounded-full border-4 border-solid border-Secondary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        )}

        {!isLoading && !gamerPosts.length && (
          <div className=" w-2/3 px-4 py-6 mt-8 text-center rounded-xl text-Black bg-Secondary">
            {dictionary["We're loading this gamer's content"]}
          </div>
        )}

        {totalPages > 1 && (
          <div className=" w-full px-4 md:max-w-[600px] lg:max-w-[800px] mt-4 flex justify-between ">
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
    </main>
  )
}
