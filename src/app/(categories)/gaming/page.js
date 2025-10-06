import React from 'react'
import SliderGamers from '@/app/components/SliderGamers'
import { CAT_GAMERS as cat } from '@/utils/static_data'
import { getData, getCategoryId } from '@/services/api-content'
import SliderLatestTricks from '@/app/components/SliderLatestTricks'
import CardsLatestVideosPosts from '@/app/components/CardsLatestVideoPosts'

import { TitleArticle } from '@/app/components/ui/TitleArticle'

import dictionary from '@/dictionary/lang.json'

export default async function page() {
  const categoryID = await getCategoryId(cat.gaming.wpSlug)
  const { data } = await getData(`categories?parent=${categoryID}`)

  const dataCategories = data.reduce((acc, cat) => {
    acc[cat.slug] = { id: cat.id, name: cat.name, slug: cat.slug }
    return acc
  }, {})

  const { data: gamersData } = await getData(
    `categories?parent=${dataCategories['gamers'].id}&per_page=10`
  )

  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 flex flex-col items-center gap-2 ">
      <section className=" w-full h-fit relative top-0 flex flex-col items-center gap-4">
        <TitleArticle
          title={dictionary['Our Gamers']}
          className=" border-2 border-Primary"
        />
        <p className=" w-full max-w-[350px] md:max-w-[550px] px-8 mb-4 text-base md:text-lg lg:text-xl text-White uppercase font-normal text-center">
          {dictionary['Our exclusive videos will turn you into a top gamer!']}
        </p>
        <SliderGamers gamersData={gamersData} miniCards />
      </section>

      {/* <section className=" mt-6 w-full py-2 flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <div className=" w-full">
          <TitleArticle
            title={dictionary['Cheats']}
            className=" bg-Tertiary text-neutral-700 "
          />
        </div>

        {dataCategories?.['trucos'].id && (
          <SliderLatestTricks
            id={dataCategories?.['trucos'].id}
            qty={5}
            categorySlug={`gaming/cheats`}
          />
        )}

        {dataCategories?.['trucos'].id && (
          <CardsLatestVideosPosts
            id={dataCategories['trucos'].id}
            qty={4}
            categorySlug={`gaming/cheats`}
          />
        )}
      </section> */}
    </main>
  )
}
