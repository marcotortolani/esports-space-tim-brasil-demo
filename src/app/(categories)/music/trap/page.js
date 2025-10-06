import React from 'react'

import { TitleSection } from '@/app/components/ui/TitleSection'
import { CAT_MUSIC as cat } from '@/utils/static_data'
import { getCategoryId } from '@/services/api-content'
import LongCardsLatestPosts from '@/app/components/LongCardsLatestPosts'

import dictionary from '@/dictionary/lang.json'

export default async function page() {
  const categoryID = await getCategoryId(cat.trap.wpSlug)

  return (
    <main className=" z-0 relative w-full h-full mb-40 lg:mb-56 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 md:px-2 lg:px-4 flex flex-col items-center gap-4 md:gap-6 lg:gap-6 ">
      {/* subcategoria TRAP/URBANO */}
      <TitleSection
        title={dictionary['Trap']}
        outline
        borderColor="border-Primary"
      />

      {categoryID && (
        <LongCardsLatestPosts id={categoryID} categorySlug={cat.trap.slug} />
      )}
    </main>
  )
}
