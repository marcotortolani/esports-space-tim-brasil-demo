import React from 'react'
import parse from 'html-react-parser'
import { cleanDataPosts, processDataRendered } from '@/utils/functions'
import {
  getDataPostById,
  getDataCategoryByPostId,
} from '@/services/api-content'

import ButtonLikeFav from '../ui/ButtonLikeFav'
import Breadcrumb from '../ui/Breadcrumb'
import StyledElements from './StyledElements'
import ImagesSlider from './ImagesSlider'
import ShareSocialMedia from './ShareSocialMedia'

import dictionary from '@/dictionary/lang.json'

export default async function PagePost({ id, children }) {
  const dataPost = await getDataPostById(id)
  const categoryData = await getDataCategoryByPostId(`${id}&parent=0`)
  const dataRendered = dataPost?.content.rendered

  const { imagesSlider, elements } = processDataRendered(dataRendered)

  const post = cleanDataPosts({
    posts: new Array(dataPost),
    categorySlug: categoryData[0].slug,
  })

  return (
    <main
      className={`z-20 mt-28 md:mb-10 md:mt-32 lg:mt-20 w-screen max-w-screen-xl h-full min-h-screen px-6 pt-6 bg-White text-Black flex flex-col items-center gap-4 md:rounded-xl`}
    >
      <div className="z-50 top-0 m-2 right-0 w-full lg:max-w-4xl h-10 flex items-center justify-between">
        <Breadcrumb homeElement={dictionary['Home']} separator={'>'} />
        <ButtonLikeFav color="#000" post={post[0]} />
      </div>
      <section className=" w-full lg:max-w-4xl flex flex-col items-center gap-4">
        <h1
          className={
            ' w-full uppercase font-druk pointer-events-none cursor-default text-[1.8rem] leading-[2rem] md:text-3xl lg:text-4xl text-Black text-left  '
          }
        >
          {parse(post[0]?.title)}
        </h1>
        <div className=" z-20 w-full h-8 flex items-center justify-start gap-4">
          <ShareSocialMedia title={post[0].title} category={post[0].category} />
        </div>
        {elements.map((el, i) => (
          <React.Fragment key={i}>
            {imagesSlider?.length > 0 && el.type === 'destacado-2' && (
              <ImagesSlider images={imagesSlider} centered key={el.content} />
            )}
            <StyledElements key={el.content} el={el} />
          </React.Fragment>
        ))}
      </section>
      {children}
      <div className="w-full h-10 md:h-20"></div>
    </main>
  )
}
