'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import parse from 'html-react-parser'

export function CardGamer({ path, gamerData, miniCard }) {
  return (
    <Link
      className="z-30 relative w-full h-full flex justify-center items-center hover:cursor-pointer  "
      href={path + `/${gamerData.id}`}
    >
      <div
        className={`${
          miniCard
            ? 'w-full min-w-[80px] max-w-[120px] md:max-w-[180px] lg:max-w-[280px] p-2  aspect-square md:aspect-video border-[0px] '
            : 'w-full max-w-[200px] lg:max-w-full aspect-[3/2] lg:aspect-video border-[0px] p-2'
        } z-0 relative flex items-center border-transparent shadow-inner hover:scale-90 transition-all duration-200 ease-in-out shadow-black h-full 
        bg-gradient-to-br from-Primary via-Tertiary to-Secondary rounded-xl md:rounded-2xl`}
      >
        <div
          className={` z-20 relative w-full h-full flex items-center justify-center  object-cover rounded-[inherit] `}
        >
          {gamerData?.image && (
            <div className=" z-10 absolute top-0 w-full h-full rounded-[inherit]">
              <Image
                className=" w-auto h-full object-cover rounded-[inherit]"
                fill
                sizes="(max-width:350px)"
                src={gamerData?.image}
                alt={`${gamerData?.name} Gamer Image`}
              />
            </div>
          )}
          <h4
            className={`${
              miniCard
                ? ' text-sm xs:text-lg md:text-xl lg:text-3xl text-shadow'
                : ' text-lg md:text-2xl text-shadow'
            } z-30  w-5/6 line-clamp-2  flex items-center justify-center shadow-Black
              font-countachBoldItalic tracking-widest uppercase font-extrabold text-center overflow-hidden cursor-default pointer-events-none text-White`}
          >
            {parse(gamerData?.name)}
          </h4>
        </div>
      </div>
    </Link>
  )
}
