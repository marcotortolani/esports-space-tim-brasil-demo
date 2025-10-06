import { getCategoryId, getData } from '../../../services/api-content'

import { CAT_GAMERS as cat } from '@/utils/static_data'
import SliderGamers from '../SliderGamers'

import CardsLatestVideosPosts from '../CardsLatestVideoPosts'
import { TitleSummary } from '../ui/TitleSummary'
import { TitleArticle } from '../ui/TitleArticle'

import dictionary from '@/dictionary/lang.json'

// const BannerTrivia = dynamic(() => import('../BannerTrivia'), {})

export default async function GamingSummary() {
  const categoryID = await getCategoryId(cat.gamers.wpSlug)
  const { data: gamersData } = await getData(`categories?parent=${categoryID}`)

  // const dataCategories = data?.reduce((acc, cat) => {
  //   acc[cat.slug] = { id: cat.id, name: cat.name, slug: cat.slug }
  //   return acc
  // }, {})

  // const { data: gamersData } = await getData(
  //   `categories?parent=${dataCategories?.gamers?.id}&per_page=10`
  // )

  if (!gamersData) return null

  return (
    <section className=" z-50 w-screen md:w-full h-fit px-2 lg:px-4 xl:px-14 my-6 relative top-0 flex flex-col items-center gap-4">
      {/* <div className=" w-full flex justify-center mb-6 ">
        <TitleSummary
          title={dictionary['Gaming']}
          className=" bg-Primary text-neutral-700 px-8 py-2 lg:px-12 lg:py-5 font-bold text-2xl md:text-3xl lg:text-5xl"
        />
      </div> */}
      <div className=" w-full pl-2 md:pl-0 flex justify-start ">
        <TitleArticle
          title={dictionary['Our Gamers']}
          className=" border-2 border-Primary"
        />
      </div>

      <SliderGamers path="/gamers" gamersData={gamersData} miniCards />
      <p className=" w-full max-w-[400px] md:max-w-[550px] px-8 mb-4 font-poppins text-White uppercase font-normal text-center md:text-lg">
        {dictionary['Be the best gamer!']}
      </p>

      {/* <BannerTrivia /> */}

      {/* <article className=" w-full px-2 md:px-0 py-2 flex flex-col md:items-center gap-4">
        <div className=" w-full">
          <TitleArticle
            title={dictionary['Cheats']}
            className=" border-2 border-Tertiary"
          />
        </div>

        {dataCategories?.['trucos'].id && (
          <CardsLatestVideosPosts
            id={dataCategories?.['trucos'].id}
            qty={4}
            categorySlug={`gaming/cheats`}
          />
        )}
      </article> */}
    </section>
  )
}
