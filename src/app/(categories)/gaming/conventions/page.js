import React from 'react'
import { TitleSection } from '@/app/components/ui/TitleSection'
// import { getCategoryId } from '@/services/api-content'
// import SliderLatestPosts from '@/app/components/SliderLatestPosts'
// import { CAT_GAMERS as cat } from '@/utils/static_data'
// import CardsLatestVideosPosts from '@/app/components/CardsLatestVideoPosts'

import dictionary from '@/dictionary/lang.json'

export default async function page() {
  // const categoryID = await getCategoryId(cat.conventions.wpSlug)

  //const videoTag = 72
  // const { data: videosEventos } = await getData(
  //   `posts?categories=${categoryID}&tags=${videoTag}`
  // )
  //const qtyVideoElements = 10
  // const randomVideoPosts = cleanDataPosts({
  //   posts: getRandomPosts({ posts: videosEventos, qty: qtyVideoElements }),
  //   categorySlug: cat.conventions.slug,
  // })

  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 flex flex-col items-center gap-2 ">
      <section className=" w-full h-fit relative top-0 flex flex-col items-center gap-4 md:gap-8">
        <TitleSection
          title={dictionary['Conventions']}
          outline
          borderColor=" border-Primary"
        />

        {/* {categoryID && (
          <SliderLatestPosts
            id={categoryID}
            qty={5}
            categorySlug={cat.conventions.slug}
          />
        )} */}

        {/* {randomVideoPosts.length > 0 && (
          <SliderMiniVideoPosts sliderElements={randomVideoPosts} />
        )} */}
        {/* {categoryID && (
          <CardsLatestVideosPosts
            id={categoryID}
            qty={10}
            categorySlug={cat.conventions.slug}
          />
        )} */}
      </section>
    </main>
  )
}
