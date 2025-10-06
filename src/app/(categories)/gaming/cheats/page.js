import React from 'react'
import { getCategoryId } from '@/services/api-content'
import { CAT_GAMERS as cat } from '@/utils/static_data'
import SliderLatestTricks from '@/app/components/SliderLatestTricks'
import CardsLatestVideosPosts from '@/app/components/CardsLatestVideoPosts'
import { TitleSection } from '@/app/components/ui/TitleSection'

import dictionary from '@/dictionary/lang.json'

export default async function page() {
  const categoryID = await getCategoryId(cat.cheats.wpSlug)

  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 lg:px-6 flex flex-col items-center gap-2 ">
      <section className=" w-full h-fit relative top-0 flex flex-col items-center gap-4 md:gap-8">
        <TitleSection
          title={dictionary['Cheats']}
          outline
          borderColor=" border-Primary"
        />
        {categoryID !== undefined && (
          <SliderLatestTricks
            id={categoryID}
            qty={5}
            categorySlug={cat.cheats.slug}
          />
        )}

        {categoryID !== undefined && (
          <CardsLatestVideosPosts
            id={categoryID}
            qty={6}
            categorySlug={cat.cheats.slug}
            verticalAspect
          />
        )}
      </section>
    </main>
  )
}
