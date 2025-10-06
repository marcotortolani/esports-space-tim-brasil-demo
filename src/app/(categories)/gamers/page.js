'use client'
import React, { useState, useEffect } from 'react'
import { getData, getCategoryId } from '@/services/api-content'
import CardsGamers from '@/app/components/CardsGamers'
import { TitleSection } from '@/app/components/ui/TitleSection'
import { CAT_GAMERS as cat } from '@/utils/static_data'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default function GamersPage() {
  const [gamersData, setGamersData] = useState([])
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
    async function fetchData() {
      const gamersID = await getCategoryId(cat?.gamers.wpSlug)

      const { data, pages } = await getData(
        `categories?parent=${gamersID}&per_page=20&page=${page}`
      )
      setGamersData(data)
      setTotalPages(parseInt(pages))
    }
    fetchData()
  }, [page])

  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 flex flex-col items-center gap-2 ">
      <section className=" w-full  h-fit relative top-0 flex flex-col items-center gap-4">
        <TitleSection
          title={dictionary['Our Gamers']}
          outline
          borderColor="border-Primary"
        />
        <p className=" w-full max-w-[350px] md:max-w-[550px] px-8 mb-4 text-base md:text-lg lg:text-xl text-White uppercase font-normal text-center">
          {dictionary['Our exclusive videos will turn you into a top gamer!']}
        </p>

        <CardsGamers gamersData={gamersData} path={`/${cat.gamers.slug}`} />
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
      </section>
    </main>
  )
}
