'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import dictionary from '@/dictionary/lang.json'

import {
  ChevronLeft,
  HomeIcon,
  HeartIcon,
  Gamepad2,
  BookText,
} from 'lucide-react'

const navButtons = [
  {
    id: 1,
    title: dictionary['Back'],
    icon: ChevronLeft,
    href: 'back',
  },
  {
    id: 2,
    title: dictionary['Editorials'],
    icon: BookText,
    href: '/editorial',
  },
  {
    id: 3,
    title: dictionary['Home'],
    icon: HomeIcon,
    href: '/',
  },
  {
    id: 4,
    title: dictionary['Favorites'],
    icon: HeartIcon,
    href: '/favorites',
  },
  {
    id: 5,
    title: dictionary['Gamers'],
    icon: Gamepad2,
    href: '/gamers',
  },
]

export default function DownbarMobile() {
  const [currentPath, setCurrentPath] = useState('/')
  const [previousPath, setPreviousPath] = useState(['', ''])
  const path = usePathname()

  useEffect(() => {
    if (path !== currentPath) {
      let newArray = previousPath
      newArray[0] = currentPath
      newArray[1] = path
      setPreviousPath([...newArray])
      setCurrentPath(path)
    }
  }, [path, currentPath])

  return (
    <div className=" z-50 fixed bottom-0 w-full h-[8vh] min-h-[40px] max-h-[60px]  p-[0.8rem] py-4  flex items-center justify-center text-SecondaryDark bg-Primary lg:hidden">
      <ul className=" w-full h-full flex items-center justify-around ">
        {navButtons.map((button) => (
          <StyledTab
            key={button.id}
            title={button.title}
            icon={button.icon}
            href={button.href}
            currentPath={currentPath}
            previousPath={previousPath}
          />
        ))}
      </ul>
    </div>
  )
}

export function StyledTab({ title, icon, href, currentPath, previousPath }) {
  const IconComponent = icon
  return (
    <li
      className={`h-fit p-2 flex items-center justify-center ${
        currentPath === href ? 'bg-Secondary text-white' : 'bg-transparent'
      }  rounded-lg `}
    >
      <Link
        className=" w-full h-full flex items-center justify-center"
        href={href === dictionary['Back'] ? previousPath[0] : href}
        aria-label={title}
      >
        <IconComponent />
      </Link>
    </li>
  )
}
