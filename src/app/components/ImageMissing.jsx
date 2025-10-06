'use client'
import React from 'react'

import dictionary from '@/dictionary/lang.json'

export default function ImageMissing({
  text = dictionary['Missing image'],
  colorBg = 'bg-Secondary',
}) {
  return (
    <div
      className={` ${colorBg} text-Black bg-opacity-80 absolute top-0 object-cover w-full h-full px-2 flex items-center justify-center text-center overflow-hidden text-sm md:text-base lg:text-lg xl:text-xl  rounded-lg md:rounded-xl lg:rounded-2xl`}
    >
      {text}
    </div>
  )
}
