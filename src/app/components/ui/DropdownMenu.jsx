'use client'
import React from 'react'
import AnimatedDropdown from './AnimatedDropdownButton'
import { TEAM_GAMERS_CATEGORIES } from '@/utils/static_data'

const { CAT_GAMERS, CAT_EDITORIAL, CAT_MUSIC } = TEAM_GAMERS_CATEGORIES
//const CAT_GAMERS_OPTIONS = Object.values(CAT_GAMERS)
const CAT_EDITORIAL_OPTIONS = Object.values(CAT_EDITORIAL)
const CAT_MUSIC_OPTIONS = Object.values(CAT_MUSIC)

export default function DropdownMenu() {
  return (
    <div className="z-10 w-full max-w-[350px] px-1 xs:px-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 ">
      {/* <AnimatedDropdown
        title={CAT_GAMERS.gaming.name}
        options={CAT_GAMERS_OPTIONS}
      /> */}
      <AnimatedDropdown
        title={CAT_EDITORIAL.editorial.name}
        options={CAT_EDITORIAL_OPTIONS}
      />
      <AnimatedDropdown
        title={CAT_MUSIC.music.name}
        options={CAT_MUSIC_OPTIONS}
      />
    </div>
  )
}
