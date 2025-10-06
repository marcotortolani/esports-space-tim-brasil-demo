import React from 'react'
import { CardVideo } from './CardVideo'

export default async function GamerPostsList({ data }) {
  return (
    <ul className=" w-full md:w-5/6 lg:w-4/6 lg:max-w-[900px] h-fit lg:max-h-[800px] px-4 py-4 lg:my-4 grid grid-cols-2 grid-rows-1  gap-3 lg:gap-4 select-none">
      {data?.map((post) => (
        <li
          key={post.id}
          className={` w-full h-full col-span-1 row-span-1  relative flex flex-col items-center justify-center rounded-lg md:rounded-xl lg:rounded-2xl`}
        >
          <CardVideo post={post} href={`/gamers/video/${post.id}`} />
        </li>
      ))}
    </ul>
  )
}
