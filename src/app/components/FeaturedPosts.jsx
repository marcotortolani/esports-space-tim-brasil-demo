import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'

import { cleanDataPosts, getRandomPosts } from '@/utils/functions'
import { getPostsByCategoryId } from '@/services/api-content'

import ButtonSeePost from './ui/ButtonSeePost'

import iconVideo from '../../../public/assets/icons/IconoVideo2.webp'
import ImageMissing from './ImageMissing'

const gridColumns = {
  2: 'grid-cols-2 grid-rows-1',
  3: 'grid-cols-2 grid-rows-1 sm:grid-cols-3',
  4: 'grid-cols-3 grid-rows-2 sm:grid-rows-1',
  5: 'grid-cols-3 grid-rows-2 sm:grid-rows-1',
}

const gridElem = {
  2: ' col-span-1 row-span-1',
  3: ' col-span-1 row-span-1',
  4: ' col-span-2 row-span-1 sm:col-span-1',
  5: ' col-span-2 row-span-1 sm:col-span-1',
}

export default async function FeaturedPosts({
  type,
  id,
  qty,
  categorySlug,
  tagExclude,
}) {
  const dataPosts = await getPostsByCategoryId({ id, tagExclude })

  const featuredPosts = cleanDataPosts({
    posts: getRandomPosts({ posts: dataPosts, qty: qty }),
    categorySlug: categorySlug,
  })

  return (
    <div className=" w-full h-full md:my-4 ">
      <ul
        className={`w-full h-fit py-4 grid ${
          gridColumns[featuredPosts.length < 4 ? featuredPosts.length : 4]
        } gap-4`}
      >
        {featuredPosts?.map((post, index) => (
          <li
            key={post.id}
            className={` ${
              index % 3 === 0 && index % 2 === 0
                ? ' col-span-3 xs:col-span-3 sm:col-span-2 md:col-span-2 '
                : 'col-span-3 xs:col-span-3 sm:col-span-1 md:col-span-1 '
            }  row-span-1 w-full h-[30vh] min-h-[180px] max-h-[220px]  relative flex flex-col items-center justify-center `}
          >
            <div className=" relative z-0 w-full h-full rounded-lg ">
              {post?.featuredImage ? (
                <Image
                  className={` relative w-full h-full object-center object-cover rounded-[inherit]`}
                  width={220}
                  height={220}
                  src={post?.featuredImage}
                  alt={`Image ${post.title}`}
                />
              ) : (
                <ImageMissing text={''} />
              )}
              <div className=" z-10 w-full h-full absolute top-0 bg-black opacity-30 rounded-[inherit] "></div>
            </div>

            <div className=" z-20 w-full h-full p-4 flex flex-col items-start justify-end gap-2 absolute bottom-0 ">
              {type === 'video' && (
                <Link
                  className=" w-full h-full"
                  href={`/${post.category}/${post.id}`}
                >
                  <div className=" relative z-0 w-full h-full p-0 flex items-center justify-center  ">
                    <Image
                      className={` relative w-1/3 max-w-[60px] h-auto object-center object-cover `}
                      width={100}
                      height={100}
                      src={iconVideo}
                      alt="Imagen"
                    />
                  </div>
                </Link>
              )}
              <h3
                className={` w-full text-start text-[0.8rem] sm:text-sm md:text-base lg:text-lg break-words sm:break-normal text-EpaWhite text-shadow-sm leading-3 shadow-black `}
              >
                {parse(post.title)}
              </h3>
              {type !== 'video' && (
                <ButtonSeePost
                  text="Ver"
                  href={`/${post.category}/${post.id}`}
                  size="xs"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
