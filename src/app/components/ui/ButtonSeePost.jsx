import React from 'react'
import Link from 'next/link'

const styles = {
  solidPrimary: ' bg-Primary text-black font-medium hover:bg-PrimaryDark ',
  gradient:
    'text-white font-semibold bg-gradient-to-r from-Tertiary via-purple-500 to-Secondary ',
  outlineSky:
    ' bg-black text-white font-medium border-solid border-2 border-Tertiary hover:bg-Tertiary hover:text-black  ',
  outlineViolet:
    ' bg-black text-white font-medium border-solid border-2 border-Secondary hover:bg-Secondary hover:text-black ',
}

const sizes = {
  xs: 'text-sm px-5 py-1 md:px-5 lg:px-6 lg:py-2 md:text-base lg:text-lg',
  sm: 'px-8 py-0 lg:px-6 lg:py-2 text-sm',
  md: 'text-xl px-8 py-0 md:text-2xl lg:text-3xl md:py-1',
  default: 'px-1 py-0',
}

export default function ButtonSeePost({ text, href, style, size }) {
  return (
    <Link
      className={`${sizes[size]} ${styles[style]} font-druk font-semibold tracking-wide text-center transition-all duration-200 ease-in-out rounded-full hover:cursor-pointer`}
      href={href}
    >
      {text}
    </Link>
  )
}
