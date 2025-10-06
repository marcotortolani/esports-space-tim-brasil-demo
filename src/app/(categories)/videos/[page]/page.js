import React from 'react'
import {
  getPostsByPageByCategoryId,
  getCategoryId,
} from '@/services/api-content'
import { cleanDataPosts } from '@/utils/functions'
import { CAT_GAMERS } from '@/utils/static_data'
import Pagination from '../../../components/ui/Pagination'
import { CardVideo } from '@/app/components/CardVideo'
import { TitleSection } from '@/app/components/ui/TitleSection'
import { PlayCircleIcon } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default async function VideosByPage({ params }) {
  const { page } = params
  const cat = CAT_GAMERS.gamers
  const categoryID = await getCategoryId(cat.wpSlug)
  const { data, pages } = await getPostsByPageByCategoryId({
    id: categoryID,
    page: page,
  })

  let dataCleaned
  if (data !== null) {
    dataCleaned = cleanDataPosts({ posts: data })
  }

  return (
    <section className=" relative w-full h-full  mt-28 mb-16 flex flex-col items-center">
      <TitleSection
        icon={PlayCircleIcon}
        title={dictionary['Videos']}
        outline
        borderColor="border-Primary"
      />
      <ul className=" w-full md:w-5/6 lg:w-4/6 lg:max-w-[900px] h-fit px-4 py-4 lg:my-4 grid grid-cols-2 lg:grid-cols-3 grid-rows-1  gap-3 lg:gap-4 select-none">
        {dataCleaned?.map((post) => (
          <li
            key={post.id}
            className={` w-full h-full col-span-1 row-span-1  relative flex flex-col items-center justify-center rounded-lg md:rounded-xl lg:rounded-2xl`}
          >
            <CardVideo post={post} href={`/videos/${page}/${post.id}`} />
          </li>
        ))}
      </ul>

      {pages && <Pagination path="/videos" page={page} pages={pages} />}
    </section>
  )
}
