// src/app/(categories)/editorial/page.js

import React from 'react'
import { CAT_EDITORIAL as cat } from '@/utils/static_data'
import { getCategoryId, getData } from '@/services/api-content'

import { TitleSection } from '@/app/components/ui/TitleSection'
import SliderCoverLatestPosts from '@/app/components/SliderCoverLatestPosts'

import SliderLatestModernPosts from '@/app/components/SliderLatestModernPosts'
import LongCardsLatestPosts from '@/app/components/LongCardsLatestPosts'
import { TitleArticle } from '@/app/components/ui/TitleArticle'

import dictionary from '@/dictionary/lang.json'

export default async function page() {
  const categoryID = await getCategoryId(cat.editorial.wpSlug)
  const { data } = await getData(`categories?parent=${categoryID}`)
  const dataCategories = data.reduce((acc, cat) => {
    acc[cat.slug] = { id: cat.id, name: cat.name, slug: cat.slug }
    return acc
  }, {})

  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-0 md:px-2 flex flex-col items-center gap-2 ">
      <section className=" w-full h-fit relative top-0 flex flex-col items-center gap-4">
        <TitleSection
          title={dictionary['Editorials']}
          outline
          borderColor="border-Secondary lg:mb-2 xl:mb-4"
        />
        <SliderCoverLatestPosts
          id={categoryID}
          qty={5}
          categorySlug="editorial"
          styleColor="primary"
        />
      </section>

      <section className=" mt-2 w-full px-4 md:px-0 lg:px-4 py-2 flex flex-col items-center gap-4">
        <div className=" lg:w-full lg:pl-2 xl:pl-0 ">
          <TitleArticle
            title={dictionary['Videogames']}
            className=" bg-Tertiary text-neutral-700 "
          />
        </div>

        {/* subcategoria VIDEOJUEGOS */}
        {categoryID && (
          <LongCardsLatestPosts
            id={dataCategories?.['videogames'].id}
            qty={4}
            page={2}
            categorySlug={`editorial/videogames`}
          />
        )}
      </section>

      <section className=" mt-6 w-full px-4 md:px-2 lg:px-4 py-2 flex flex-col items-center gap-4">
        <div className=" lg:w-full lg:pl-2">
          <TitleArticle
            title={dictionary['Retro']}
            className=" bg-Secondary text-white "
          />
        </div>

        {categoryID && (
          <SliderLatestModernPosts
            id={dataCategories?.['retro'].id}
            qty={5}
            categorySlug={`editorial/retro`}
          />
        )}
      </section>

      <section className=" mt-6 w-full px-4 md:px-2 lg:px-4 py-2 flex flex-col items-center gap-4">
        <div className=" lg:w-full lg:pl-2 xl:pl-0">
          <TitleArticle
            title={dictionary['Technology']}
            className=" bg-Tertiary text-neutral-700 "
          />
        </div>

        {/* subcategoria TECNOLOGIA */}
        {categoryID && (
          <div className=" px-4 md:px-0">
            <LongCardsLatestPosts
              id={dataCategories?.['technology'].id}
              qty={4}
              page={2}
              categorySlug={`editorial/technology`}
            />
          </div>
        )}
      </section>
    </main>
  )
}
