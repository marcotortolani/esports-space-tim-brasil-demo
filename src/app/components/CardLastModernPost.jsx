import React from 'react'
import Image from 'next/image'
import ImageMissing from './ImageMissing'
import parse from 'html-react-parser'
import ButtonSeePost from './ui/ButtonSeePost'

import dictionary from '@/dictionary/lang.json'

export default function CardLastModernPost({ post, titleOnly, i = 0 }) {
  return (
    <div className=" w-full  h-fit flex justify-center">
      <div
        className={` ${
          i % 2 === 0 ? ' bg-Primary ' : ' bg-Tertiary '
        } relative w-[90%] lg:w-[95%] aspect-square md:aspect-[4/3] lg:aspect-[5/4] xl:aspect-[4/3]  flex flex-col items-center rounded-xl lg:rounded-2xl`}
      >
        <div className="  relative w-full h-4/5  rounded-[inherit]">
          {post?.images.length > 0 ? (
            <Image
              className={` w-auto h-full p-1 md:p-2 md:w-full md:h-auto object-cover rounded-[inherit]`}
              fill={true}
              sizes="(max-width: 350px)"
              src={post?.images[0]}
              alt={`Image ${post?.title}`}
            />
          ) : (
            <ImageMissing />
          )}
          <div className=" absolute bottom-0 left-0 right-0 top-0 m-1 md:m-2 bg-gradient-to-b from-transparent via-black/40 to-black/90 rounded-[inherit]">
            <h4
              className={`absolute bottom-2 left-2 px-2 font-druk text-white font-semibold line-clamp-2 uppercase text-start text-xl md:text-2xl lg:text-3xl `}
            >
              {parse(post?.title)}
            </h4>
          </div>
          {!titleOnly && (
            <p
              className={
                ' lowercase font-medium text-xl md:text-2xl lg:text-base line-clamp-2 text-Black  overflow-hidden '
              }
            >
              {parse(post?.excerpt)}
            </p>
          )}
        </div>

        <div className="  py-2 lg:pb-3 flex items-center">
          <ButtonSeePost
            text={dictionary['See post']}
            href={`/${post?.category}/${post?.id}`}
            style={i % 2 === 0 ? 'outlineSky' : 'outlineViolet'}
            size="xs"
          />
        </div>
      </div>
    </div>
  )
}
