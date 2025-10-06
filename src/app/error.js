'use client'
import React from 'react'
import Link from 'next/link'

import dictionary from '@/dictionary/lang.json'

export default function error({ error }) {
  return (
    <main className=" z-0 mt-36 w-full   h-full min-h-screen px-4 flex flex-col items-center justify-between ">
      <div className=" w-full md:w-5/6 lg:w-4/6 lg:max-w-[900px] flex flex-col items-center gap-6">
        <div className="relative w-2/3 h-1/2 p-4 lg:min-h-[200px] flex flex-col items-center justify-center gap-2 bg-EpaPrimaryDark rounded-2xl">
          <span className={' text-4xl uppercase font-semibold text-EpaWhite'}>
            {dictionary['Oops!']}
          </span>
          <h2 className={' px-10 text-center text-xl text-EpaWhite'}>
            {dictionary["We're having trouble loading the content"]}
          </h2>
          <span className=" absolute bottom-2 font-mono text-sm text-red-900">
            {error.message}
          </span>
        </div>
        <Link
          className={' px-4 py-2 font-semibold bg-EpaSecondary rounded-lg'}
          href={'/'}
          target="_self"
        >
          {dictionary['Back to home']}
        </Link>
      </div>

      <div className="w-full h-20"></div>
    </main>
  )
}
