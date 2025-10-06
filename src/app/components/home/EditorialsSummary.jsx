import React from 'react'
import { getData, getCategoryId } from '../../../services/api-content'

import { CAT_EDITORIAL as cat } from '@/utils/static_data'
import SliderCoverLatestPosts from '../SliderCoverLatestPosts'
import ShortCardsLatestPosts from '../ShortCardsLatestPosts'
import LongCardsLatestPosts from '../LongCardsLatestPosts'
import { TitleSummary } from '../ui/TitleSummary'
import { TitleArticle } from '../ui/TitleArticle'

import dictionary from '@/dictionary/lang.json'

export default async function EditorialsSummary() {
  const categoryID = await getCategoryId(cat.editorial.wpSlug)
  const { data } = await getData(`categories?parent=${categoryID}`)
  const dataCategories = data.reduce((acc, cat) => {
    acc[cat.slug] = { id: cat.id, name: cat.name, slug: cat.slug }
    return acc
  }, {})

  return (
    <section className=" z-50 w-full h-fit relative top-0 flex flex-col items-center gap-8">
      <div className=" w-full flex justify-center lg:mb-6 ">
        <TitleSummary
          title={dictionary['Editorial']}
          className=" bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-500  text-white px-8 py-2 lg:px-12 lg:py-5 font-bold text-2xl md:text-3xl lg:text-5xl"
        />
      </div>

      <SliderCoverLatestPosts
        id={categoryID}
        qty={5}
        categorySlug="editorial"
      />

      <article className=" w-full px-0 md:px-2 lg:px-14 ">
        {/* subcategoria VIDEOJUEGOS */}
        <ShortCardsLatestPosts
          id={dataCategories['videogames'].id}
          qty={3}
          categorySlug={`editorial/videogames`}
        />
      </article>

      <article className=" w-full mt-2 lg:mt-10 px-0 lg:px-14 ">
        {/* subcategoria TECNOLOGIA */}
        <TitleArticle
          title={dictionary['Technology']}
          className="mb-4 md:ml-2 lg:ml-0 border-2 border-Tertiary"
        />
        <LongCardsLatestPosts
          id={dataCategories['technology'].id}
          qty={4}
          categorySlug={`editorial/technology`}
          paginationHide
        />
      </article>
    </section>
  )
}
