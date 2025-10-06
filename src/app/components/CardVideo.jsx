import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { PlayCircleIcon } from 'lucide-react'
import ImageMissing from './ImageMissing'

export function CardVideo({ post, index, href, verticalAspect }) {
  return (
    <Link className="w-full h-full" href={href}>
      <div className=" relative z-0 w-full h-full rounded-md md:rounded-lg lg:rounded-xl">
        {post?.featuredImage && post?.featuredImage.length > 0 ? (
          <Image
            className={` relative w-full h-full  object-cover rounded-[inherit] cursor-default pointer-events-none select-none`}
            width={200}
            height={80}
            src={post?.featuredImage}
            priority={index === 0}
            alt={`Image ${post?.title}`}
          />
        ) : (
          <ImageMissing text="" />
        )}
        <div className=" z-10 absolute top-0 w-full h-full md:px-10 lg:px-16 flex items-center justify-center bg-gradient-to-b from-transparent via-black/40 to-black/90 rounded-[inherit] ">
          <PlayCircleIcon color="white" size={verticalAspect ? '30%' : '25%'} />
        </div>
        <div className=" z-20 w-full h-full p-2 absolute bottom-0 pointer-events-none select-none rounded-[inherit]">
          <h4
            className={`${
              verticalAspect
                ? 'text-[0.6rem] xs:text-xs md:text-base lg:text-xl'
                : 'text-xl leading-6 sm:text-xl md:text-3xl lg:text-3xl'
            } absolute bottom-2 md:bottom-4 md:left-4 w-5/6 text-white font-druk font-normal tracking-wider line-clamp-1 text-start  pointer-events-none select-none`}
          >
            {parse(post?.title)}
          </h4>
        </div>
      </div>
    </Link>
  )
}
