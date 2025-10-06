import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { URL_LANDING_SUBS } from '@/config/config'
//import RRSS from './RRSS'

import dictionary from '@/dictionary/lang.json'

export default function Footer() {
  return (
    <footer
      className={` z-20 w-full  py-10 mb-16 flex flex-col items-center justify-around gap-4 
        bg-neutral-700/20 shadow-md backdrop-filter backdrop-blur-xl ring-1 ring-gray-500/50 `}
    >
      <div className="w-full max-w-[200px] h-1/4 sm:h-2/5 md:h-1/3 flex items-center justify-center  cursor-default pointer-events-none">
        <Link
          href={'/'}
          className=" w-fit h-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer pointer-events-auto"
        >
          <Image
            width={250}
            height={250}
            className=" w-auto h-full"
            src={'/assets/LogoEsportSpaceColor.webp'}
            alt={`Logo ${dictionary['site']}`}
          />
        </Link>
      </div>
      <div className=" h-1/3 flex flex-col items-center gap-0 pointer-events-none cursor-defaul select-none">
        <p className=" uppercase font-montserrat text-xs md:text-sm lg:text-base leading-4 text-White">
          {dictionary['site']}
        </p>
        <p className=" uppercase font-montserrat text-xs md:text-sm lg:text-base leading-4 text-White">
          {dictionary['All rights reserved.']}
        </p>
      </div>
      <Link
        href={'/tyc/'}
        className=" h-1/4 uppercase font-poppins text-xs md:text-sm lg:text-base text-Secondary hover:text-SecondaryDark underline"
      >
        {dictionary['Terms and Conditions']}
      </Link>
      <Link
        href={URL_LANDING_SUBS}
        target="_blank"
        className=" h-1/4 uppercase font-poppins text-xs md:text-sm lg:text-base text-Tertiary hover:text-TertiaryDark underline"
      >
        {dictionary['Subscribe']}
      </Link>
      {/* <div className="z-40 mt-4 md:hidden flex items-center gap-6">
        <RRSS />
      </div> */}
    </footer>
  )
}
