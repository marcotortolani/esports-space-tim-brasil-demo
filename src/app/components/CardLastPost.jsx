import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageMissing from './ImageMissing'
import parse from 'html-react-parser'

import dictionary from '@/dictionary/lang.json'

export default function CardLastPost({ post, index, titleOnly }) {
  return (
    <Link
      className=" relative w-full h-fit "
      href={`/${post?.category}/${post?.id}`}
    >
      <div
        className={`${
          index % 2 !== 0 ? ' bg-Tertiary ' : ' bg-Primary '
        } relative w-full h-fit p-2 md:p-3 flex flex-col justify-center gap-4 rounded-lg md:rounded-xl overflow-hidden`}
      >
        <div className="  relative w-full aspect-[3/2] rounded-[inherit] overflow-hidden ">
          {post?.images.length > 0 ? (
            <Image
              className={` w-auto h-full md:w-full md:h-auto object-cover rounded-[inherit] `}
              fill
              priority={index === 0}
              sizes="(max-width: 350px)"
              src={post?.images[0]}
              alt={`Image ${post?.title}`}
            />
          ) : (
            <ImageMissing />
          )}
          {index < 3 && (
            <span className=" absolute top-3 left-3 md:top-4 md:left-4 lg:top-4 lg:left-4 px-4 py-1 text-xs md:text-sm lg:text-base text-White bg-Black border-2 border-Secondary rounded-full ">
              {dictionary['Newly added']}
            </span>
          )}
          <div className=" z-20 absolute top-0 w-full h-full px-4 pb-2 lg:pb-4 bg-gradient-to-b from-transparent via-transparent to-black flex flex-col justify-end gap-2 md:gap-3 lg:gap-4 md:bottom-6 lg:bottom-8">
            <h4
              className={`text-white font-druk tracking-wider line-clamp-1 uppercase text-start text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
            >
              {parse(post?.title)}
            </h4>
          </div>
        </div>
        {!titleOnly && (
          <p
            className={
              ' font-montserrat font-medium text-sm md:text-base lg:text-lg line-clamp-2 text-black  overflow-hidden '
            }
          >
            {parse(post?.excerpt)}
          </p>
        )}
      </div>
    </Link>
  )
}
