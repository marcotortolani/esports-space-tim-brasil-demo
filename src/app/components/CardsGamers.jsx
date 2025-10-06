import React from 'react'
import { CardGamer } from './CardGamer'

export default function CardsGamers({ gamersData, path, miniCards }) {
  if (!gamersData) return null
  return (
    <ul
      className={`  w-full px-2 lg:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 lg:gap-10 xl:gap-8`}
    >
      {gamersData?.map((gamerData) => (
        <li key={gamerData.id} className=" col-span-1 row-span-1">
          <CardGamer path={path} gamerData={gamerData} miniCard={miniCards} />
        </li>
      ))}
    </ul>
  )
}
