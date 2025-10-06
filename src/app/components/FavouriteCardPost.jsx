'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import { StateContext } from '@/providers/StateProvider'
import parse from 'html-react-parser'
import ButtonLikeFav from './ui/ButtonLikeFav.jsx'

import ImageMissing from './ImageMissing.jsx'
import ButtonSeePost from './ui/ButtonSeePost.jsx'
import { getData } from '@/services/api-content.js'
import { cleanDataPosts } from '@/utils/functions.js'
import { TitleArticle } from './ui/TitleArticle.jsx'
import { TitleSummary } from './ui/TitleSummary.jsx'
import SwiperSliderCoverPosts from './SwiperSliderCoverPosts.jsx'

import dictionary from '@/dictionary/lang.json'

export default function FavouriteCardPost() {
  const [favPosts, setFavPosts] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const { favouritePosts } = useContext(StateContext)

  useEffect(() => {
    if (!favouritePosts) return

    setFavPosts(favouritePosts)

    const fetchLatestPosts = async () => {
      try {
        const { data } = await getData(
          `posts?per_page=6&page=1&tags_exclude=72`
        )
        const postsCleaned = cleanDataPosts({
          posts: data,
          categorySlug: '/',
        })
        setLatestPosts(postsCleaned)
      } catch (error) {
        console.error('Error fetching favourite posts:', error)
      }
    }

    fetchLatestPosts()
  }, [favouritePosts])

  if (!favPosts) return null

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center gap-4 lg:gap-14 ">
      <section className=" w-full h-full mb-4 flex flex-col items-center justify-center gap-8">
        <TitleSummary
          title={dictionary['Favorites']}
          className=" bg-Primary text-neutral-700 px-8 py-2 lg:px-12 lg:py-5 font-bold text-lg md:text-xl lg:text-3xl"
        />
        {favPosts?.length === 0 ? (
          <div className="bg-Secondary w-5/6 mx-auto max-w-[400px] lg:max-w-[750px] px-10 py-5 flex items-center justify-center text-center md:text-left font-montserrat font-semibold text-base md:text-lg lg:text-xl tracking-wide rounded-xl">
            {
              dictionary[
                "You haven't added any favorites yet. Start enjoying our content and save your favorites!"
              ]
            }
          </div>
        ) : (
          <ul className=" w-full h-full grid md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6">
            {favPosts?.length >= 1 &&
              favPosts?.map((post, index) => (
                <li key={post?.id}>
                  <NewFavouriteCard post={post} index={index} />
                </li>
              ))}
            {Array.from({ length: 3 - favPosts.length }).map((_, index) => (
              <li
                key={index}
                className=" w-full h-full min-h-[200px] lg:min-h-[280px] text-white border-2 border-white border-dashed flex items-center justify-center rounded-lg md:rounded-xl"
              >
                <p>{dictionary['Keep adding your favorites.']}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className="w-full h-0.5 bg-white/60 rounded-full content-normal" />
      <section className=" w-full h-full">
        <div className=" w-full mb-4  ">
          <TitleArticle
            title={dictionary['Recommended Content']}
            className=" mx-auto border-2 border-Tertiary"
          />
        </div>
        {latestPosts.length > 0 && (
          <SwiperSliderCoverPosts
            posts={latestPosts}
            delayPerView={5500}
            colorBullets={'white'}
            sizeBullets={'default'}
          />
        )}
      </section>
    </div>
  )
}

export function FavouriteCard({ post, index }) {
  return (
    <div
      className={`relative w-full min-w-[250px] xs:min-w-[300px] md:min-w-[500px] lg:min-w-[700px] h-full max-h-[200px] md:min-h-[250px] md:max-h-[300px] lg:min-h-[320px] lg:max-h-[380px] p-4 lg:p-8 my-2 mt-0 grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6 rounded-xl md:rounded-xl lg:rounded-2xl ${
        index % 2 !== 0 ? ' bg-Primary ' : ' bg-Secondary  '
      } `}
    >
      <div
        className={`relative w-full aspect-square lg:aspect-[0] order-last col-span-1 lg:col-span-3 `}
      >
        {post?.images?.length > 0 ? (
          <Image
            className={` absolute w-full h-full  object-center object-cover  rounded-lg md:rounded-xl lg:rounded-2xl`}
            fill
            sizes="(max-width: 350px)"
            src={post?.images[0]}
            alt={`Image ${post?.title}`}
          />
        ) : (
          <ImageMissing />
        )}
        <div className=" absolute bottom-0 w-full h-full pb-2 px-2 flex flex-col justify-end ">
          <h3
            className={`${
              index % 2 !== 0 ? 'text-White' : 'text-Black'
            } font-semibold line-clamp-2 uppercase text-start text-base `}
          >
            <span
              className={`${
                index % 2 !== 0 ? 'bg-Black/80' : 'bg-White/80'
              } px-1 pr-2 box-decoration-clone leading-[1.7rem]`}
            >
              {parse(post?.title)}
            </span>
          </h3>
          <div className=" absolute top-2 right-2 w-10 md:w-12 lg:w-14 flex items-center justify-center bg-Black/80 rounded-full p-2 md:px-0 lg:p-2">
            <ButtonLikeFav
              post={post}
              color={index % 2 === 0 ? '#A26DAA' : '#39DFFF'}
            />
          </div>
        </div>
      </div>

      <div className=" relative col-span-1 lg:col-span-2 w-full h-full flex flex-col gap-2 md:gap-2 lg:gap-4 ">
        <p
          className={`${
            index % 2 !== 0 ? 'text-White' : 'text-Black'
          } w-full overflow-hidden text-sm md:text-base lg:text-lg line-clamp-[6] md:line-clamp-[7] lg:line-clamp-[7] `}
        >
          {post?.excerpt ? parse(post?.excerpt) : dictionary['No description']}
        </p>

        <div className=" z-20 absolute bottom-0 w-full h-1/6 flex items-center justify-center">
          <ButtonSeePost
            text={dictionary['See post']}
            href={`/${post?.category}/${post?.id}`}
            style={index % 2 !== 0 ? 'outlineSky' : 'outlineViolet'}
            size="xs"
          />
        </div>
      </div>
    </div>
  )
}

export function NewFavouriteCard({ post, index }) {
  return (
    <div
      className={`${
        index % 2 !== 0 ? ' bg-Tertiary ' : ' bg-Primary '
      } relative w-full h-fit p-2 md:p-3 flex flex-col justify-center gap-4 rounded-lg md:rounded-xl overflow-hidden`}
    >
      <div className="  relative w-full aspect-[3/2] rounded-[inherit] overflow-hidden ">
        {post?.images && post?.images?.length > 0 ? (
          <Image
            className={` w-auto h-full md:w-full md:h-auto object-cover rounded-[inherit] `}
            fill
            priority={index === 0}
            sizes="(max-width: 350px)"
            src={post?.images ? post?.images[0] : ''}
            alt={`Image ${post?.title}`}
          />
        ) : (
          <ImageMissing />
        )}

        <div className=" z-20 absolute top-0 w-full h-full px-4 pb-2 lg:pb-4 bg-gradient-to-b from-transparent via-transparent to-black flex flex-col justify-end gap-2 md:gap-3 lg:gap-4 md:bottom-6 lg:bottom-8">
          <h4
            className={`text-white font-druk tracking-wider line-clamp-1 uppercase text-start text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
          >
            {parse(post?.title)}
          </h4>
        </div>
        <div className="z-30 absolute hover:scale-105 top-2 right-2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-Black/80 rounded-full p-2 md:px-0 lg:p-3 transition-all duration-200 ease-in-out">
          <ButtonLikeFav
            post={post}
            color={index % 2 === 0 ? '#A26DAA' : '#39DFFF'}
          />
        </div>
      </div>
      <div className=" z-20 absolute1 bottom-0 w-full h-1/6 flex items-center justify-center">
        <ButtonSeePost
          text={dictionary['See post']}
          href={`/${post?.id}`}
          style={index % 2 !== 0 ? 'outlineViolet' : 'outlineSky'}
          size="xs"
        />
      </div>
    </div>
  )
}
