
import React from 'react'
import FavouriteCardPost from '@/app/components/FavouriteCardPost'

export default function FavouritesPage() {
  return (
    <main className=" z-0 relative w-full h-full mb-40 container top-[6rem] md:top-[5rem] lg:top-[4rem] px-4 flex flex-col items-center gap-2 ">
      <FavouriteCardPost />

      <div className="w-full h-20"></div>
    </main>
  )
}
