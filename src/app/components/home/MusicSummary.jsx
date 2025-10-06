import React from 'react'
import { getData, getCategoryId } from '../../../services/api-content'
import { CAT_MUSIC as cat } from '@/utils/static_data'
import SliderCoverLatestPosts from '../SliderCoverLatestPosts'
import { TitleSummary } from '../ui/TitleSummary'
import SubSectionCard from '../music/SubSectionCard'

import dictionary from '@/dictionary/lang.json'

export default async function MusicSummary() {
  const categoryID = await getCategoryId(cat.music.wpSlug)
  const { data } = await getData(`categories?parent=${categoryID}`)
  const dataCategories = data.reduce((acc, cat) => {
    acc[cat.slug] = { id: cat.id, name: cat.name, slug: cat.slug }
    return acc
  }, {})

  return (
    <section className=" z-50 w-full mt-4 h-fit relative top-0 flex flex-col items-center gap-8 ">
      <div className=" w-full flex justify-center lg:mb-6 ">
        <TitleSummary
          title={dictionary['Music']}
          className=" bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-500  text-white px-8 py-2 lg:px-12 lg:py-5 font-bold text-2xl md:text-3xl lg:text-5xl"
        />
      </div>

      <SliderCoverLatestPosts
        id={categoryID}
        qty={5}
        categorySlug="music"
        styleColor="secondary"
      />

      <div className=" w-full h-[50vh] max-h-[350px] md:h-[30vh] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 lg:gap-8 xl:gap-10 px-2 lg:px-8 xl:px-14">
        <SubSectionCard
          categoryId={dataCategories['trap'].id}
          categorySlug={`music/trap`}
          title={`${dictionary['Trap']}/ ${dictionary['Urban']}`}
          colorCard="bg-Primary"
        />
        <SubSectionCard
          categoryId={dataCategories['pop'].id}
          categorySlug={`music/pop`}
          title={dictionary['Pop']}
          colorCard="bg-Secondary"
        />
      </div>
    </section>
  )
}
