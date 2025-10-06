'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import SearchBar from './SearchBar'
import DropdownMenu from './DropdownMenu'
import { HeartIcon, SearchIcon, MenuIcon, XIcon } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default function Header() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const [activeSearchBar, setActiveSearchBar] = useState(false)
  const [lowerPosition, setLowerPosition] = useState(0)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    setActiveSearchBar(false)

    if (scrollPosition > lowerPosition + 100) {
      setLowerPosition(scrollPosition)
      setIsNavbarVisible(false)
      setMobileMenuIsOpen(false)
    }
    if (scrollPosition + 50 <= lowerPosition) {
      setLowerPosition(scrollPosition)
      setIsNavbarVisible(true)
    }
  }, [lowerPosition])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    setMobileMenuIsOpen(false)
  }, [pathname])

  return (
    <header
      className={` ${
        isNavbarVisible ? 'top-0 ' : ' -top-44 lg:-top-[10.5rem]  '
      } ${
        lowerPosition >= 50
          ? 'bg-neutral-700/20 shadow-md backdrop-filter backdrop-blur-xl ring-1 ring-gray-500'
          : 'bg-transparent'
      } z-[200] rounded-b-xl py-4 transition-all duration-300 ease-in-out fixed w-screen  h-fit flex justify-center`}
    >
      {/* Tablet Large & Desktop Navigation */}
      <div className="w-full hidden container h-auto py-4 lg:flex items-start xl:justify-between ">
        <Link
          href={'/'}
          className=" relative w-full max-w-[250px] h-[3rem] md:h-[3.5rem] lg:h-[4rem] cursor-pointer"
        >
          <Image
            className=" mx-auto w-auto h-full"
            width={250}
            height={64}
            src={'/assets/LogoEsportSpaceWhite.webp'}
            alt={`Horizontal Logo ${dictionary['site']}`}
            priority
          />
        </Link>

        <div className=" w-3/5 pt-2 flex items-center justify-between gap-2 xl:gap-8">
          <DropdownMenu />
          <NavTab title={dictionary['Gamers']} href="/gamers" path={pathname} />
          <div className=" flex items-center gap-2">
            <button
              type="button"
              className={` relative hidden lg:flex transition-colors duration-200 bg-black/0 p-1 font-poppins text-white ease-in-out items-center justify-center rounded-lg `}
              onClick={() => setActiveSearchBar(!activeSearchBar)}
            >
              <SearchIcon className="mr-2 w-5 h-5" />
              {dictionary['Search']}
              <div
                className={` ${
                  activeSearchBar
                    ? ' translate-y-0.5 scale-x-100 opacity-100 '
                    : ' -translate-y-2 scale-x-0 opacity-0 '
                } absolute bottom-0 -z-10 w-[80%] mx-auto h-1 bg-Primary content-normal block transition-all duration-200 ease-in-out rounded-full`}
              />
            </button>
            <span className=" w-0.5 h-6 bg-white content-normal rounded-full"></span>
            <Link
              className={` relative hidden lg:flex transition-colors duration-200 bg-black/0 p-1 font-poppins text-white ease-in-out items-center justify-center rounded-lg `}
              href={'/favorites'}
              aria-label={'favorites'}
            >
              {dictionary['Favorites']}
              <HeartIcon className="ml-2 w-5 h-5" />
              <div
                className={` ${
                  pathname === '/favorites'
                    ? ' translate-y-0.5 scale-x-100 opacity-100 '
                    : ' -translate-y-2 scale-x-0 opacity-0 '
                } absolute bottom-0 -z-10 w-[80%] mx-auto h-1 bg-Primary content-normal block transition-all duration-200 ease-in-out rounded-full`}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Tablet Small & Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className="relative w-full flex container h-auto py-4 lg:hidden items-center justify-around "
      >
        <button
          type="button"
          onClick={() => setMobileMenuIsOpen(true)}
          className=" text-white"
        >
          <MenuIcon className=" w-10 h-10" />
        </button>

        <div
          className={`${
            mobileMenuIsOpen ? ' translate-x-0 ' : ' -translate-x-[200%] '
          }  absolute left-4 top-2 z-20 bg-Primary w-fit px-2 h-fit pt-4 pb-10 flex flex-col items-start justify-center gap-4 rounded-2xl rounded-tl-none transition-all duration-200 ease-in-out `}
        >
          <button
            type="button"
            onClick={() => setMobileMenuIsOpen(false)}
            className=" text-white"
          >
            <XIcon className=" w-10 h-10 text-TertiaryDark" />
          </button>
          <DropdownMenu />
          <Link
            href="/gamers"
            className="mx-2 px-6 py-2 text-white bg-TertiaryDark rounded-full"
          >
            <span className="z-20 font-poppins font-semibold lg:font-normal text-[0.6rem] xs:text-sm md:text-base ">
              {dictionary['Gamers']}
            </span>
          </Link>
        </div>
        <Link
          href={'/'}
          className=" relative w-full max-w-[250px] h-[3rem] md:h-[3.5rem] lg:h-[4rem] cursor-pointer"
        >
          <Image
            className=" mx-auto w-auto h-full"
            width={250}
            height={64}
            src={'/assets/LogoEsportSpaceColor.webp'}
            alt={`Horizontal Logo ${dictionary['site']}`}
            priority
          />
        </Link>
        <Link
          className={` relative flex lg:hidden transition-colors duration-200 bg-black/0 p-1 font-poppins text-white ease-in-out items-center justify-center md:gap-2 rounded-lg `}
          href={'/favorites'}
          aria-label={'favoritos'}
        >
          <span className="hidden md:block">{dictionary['Favorites']}</span>
          <HeartIcon
            className={`${
              pathname === '/favorites' && 'fill-Primary text-Primary'
            } w-7 h-7 transition-all duration-200 ease-in-out`}
          />
          <div
            className={` ${
              pathname === '/favorites'
                ? ' translate-y-0.5 scale-x-100 opacity-100 '
                : ' -translate-y-2 scale-x-0 opacity-0 '
            } hidden md:block  absolute bottom-0 -z-10 w-[80%] mx-auto h-1 bg-Primary content-normal transition-all duration-200 ease-in-out rounded-full`}
          />
        </Link>
      </div>

      <div
        className={`${
          activeSearchBar
            ? ' translate-y-1/2 '
            : ' translate-y-1/2 lg:-translate-y-[500%] '
        } absolute bottom-0 w-full flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-6 transition-all duration-200 ease-in-out`}
      >
        <SearchBar
          isVisible={isNavbarVisible}
          activeSearchBar={activeSearchBar}
        />
      </div>
    </header>
  )
}

export function NavTab({ title, href, path, children }) {
  const isActive = path === href || (href === '/' && path === '')
  return (
    <Link
      className={` relative hidden lg:flex transition-colors duration-200 bg-black/0 p-1 font-poppins text-white ease-in-out items-center justify-center rounded-lg `}
      href={href}
      aria-label={title}
    >
      {title}
      {children ? children : null}

      <div
        className={` ${
          isActive
            ? ' translate-y-0.5 scale-x-100 opacity-100 '
            : ' -translate-y-2 scale-x-0 opacity-0 '
        } absolute bottom-0 -z-10 w-[80%] mx-auto h-1 bg-Primary content-normal block transition-all duration-200 ease-in-out rounded-full`}
      />
    </Link>
  )
}
