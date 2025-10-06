import React from 'react'
import { CAT_MUSIC as cat } from '@/utils/static_data'
import { getCategoryId, getData } from '@/services/api-content'
import { TitleSection } from '@/app/components/ui/TitleSection'
import SliderCoverLatestPosts from '@/app/components/SliderCoverLatestPosts'
import LongCardsLatestPosts from '@/app/components/LongCardsLatestPosts'
import { TitleArticle } from '@/app/components/ui/TitleArticle'

import dictionary from '@/dictionary/lang.json'

export default async function page() {
  const categoryID = await getCategoryId(cat.music.wpSlug)
  const { data } = await getData(`categories?parent=${categoryID}`)
  const dataCategories = data.reduce((acc, cat) => {
    acc[cat.slug] = { id: cat.id, name: cat.name, slug: cat.slug }
    return acc
  }, {})

  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 md:px-2 flex flex-col items-center gap-2 ">
      <section className=" w-full h-fit relative top-0 flex flex-col items-center gap-4">
        <TitleSection
          title={dictionary['Music']}
          outline
          borderColor="border-Secondary lg:mb-2 xl:mb-4"
        />
        <SliderCoverLatestPosts
          id={categoryID}
          qty={5}
          categorySlug={cat.music.slug}
          styleColor="primary"
        />
      </section>

      <section className=" mt-2 w-full py-2 flex flex-col items-center gap-4">
        {/* subcategoria TRAP/URBANO */}
        <TitleArticle
          title={`${dictionary['Trap']} & ${dictionary['Urban']}`}
          className=" bg-Tertiary text-neutral-700 "
        />

        {categoryID && (
          <LongCardsLatestPosts
            id={dataCategories.trap.id}
            qty={6}
            categorySlug={`${cat.music.slug}/${dataCategories.trap.slug}`}
          />
        )}
      </section>

      <section className=" mt-6 w-full py-2 flex flex-col items-center gap-4">
        {/* subcategoria POP */}
        <TitleArticle
          title={dictionary['Pop']}
          className=" bg-Secondary text-white "
        />

        {categoryID && (
          <LongCardsLatestPosts
            id={dataCategories.pop.id}
            qty={6}
            categorySlug={`${cat.music.slug}/${dataCategories.pop.slug}`}
          />
        )}
      </section>
    </main>
  )
}
