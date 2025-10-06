'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { ChevronDownIcon } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

const AnimatedDropdown = ({ Icon = null, title, options }) => {
  const [open, setOpen] = useState(false)
  const [optionActive, setOptionActive] = useState('')
  const ref = useRef(null)
  const router = useRouter()
  const pathname = usePathname()

  function handleOption(slug) {
    setOpen(false)
    router.push(`/${slug}`)
  }

  const handleScroll = () => {
    setOpen(false)
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
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
    const lastPath = pathname.split('/').slice(-1)[0]

    if (lastPath === '') {
      setOptionActive('home')
    } else {
      setOptionActive(lastPath)
    }
    setOpen(false)
  }, [pathname])

  return (
    <div
      ref={ref}
      className={` flex items-center justify-center bg-TertiaryDark lg:bg-transparent p-2 lg:p-0 rounded-full`}
    >
      <motion.div animate={open ? 'open' : 'closed'} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`w-fit relative flex items-center gap-1 px-4 text-white rounded-full transition-colors duration-200 ease-in-out`}
        >
          {Icon && (
            <div className=" w-4 xs:w-5">
              <Icon size={'100%'} />
            </div>
          )}
          <span className="z-20 font-poppins font-semibold lg:font-normal text-[0.6rem] xs:text-sm md:text-base ">
            {title}
          </span>
          <motion.span className="z-20  w-4 xs:w-5 " variants={iconVariants}>
            <ChevronDownIcon width={'100%'} />
          </motion.span>

          <div
            className={` ${
              pathname.includes(title.toLowerCase()) &&
              !pathname.includes('gamers')
                ? ' translate-y-0.5 scale-x-100 opacity-100 '
                : ' -translate-y-2 scale-x-0 opacity-0 '
            } absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 -z-10 w-[70%] mx-auto h-1 bg-Primary content-normal block transition-all duration-200 ease-in-out rounded-full`}
          />
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          className="z-30 w-full lg:w-fit flex flex-col gap-4 lg:gap-2 px-2 lg:px-4 pb-2 pt-2 lg:pt-3 -mt-3 lg:mt-6 rounded-2xl bg-neutral-500 lg:bg-neutral-500/40 backdrop-blur-lg text-white absolute top-10 lg:top-[0%] left-0 lg:left-[0%]  overflow-hidden"
        >
          <Option
            firstOption
            setOpen={() => handleOption(options[0].slug)}
            text={options[0].name}
            optionActive={pathname === options[0].name.toLowerCase()}
          />

          {options.map((option, i) => {
            if (i > 0) {
              return (
                <Option
                  key={i}
                  setOpen={() => handleOption(option.slug)}
                  text={option.name}
                  optionActive={optionActive === option.name.toLowerCase()}
                />
              )
            } else {
              return null
            }
          })}
        </motion.ul>
      </motion.div>
    </div>
  )
}

const Option = ({ firstOption, text, setOpen, optionActive }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className={`${
        optionActive
          ? 'bg-Primary text-neutral-800 py-1 justify-center absolute left-0 translate-x-[50%]'
          : firstOption
          ? ' z-50 text-black bg-gradient-to-b from-transparent to-white hover:from-transparent hover:to-Tertiary font-normal justify-center absolute top-0 left-0 mt-0 translate-x-[50%] h-8 md:h-10 lg:h-8 rounded-t-none '
          : ' bg-transparent text-white hover:bg-PrimaryDark/80 hover:text-white  '
      } 
      relative -top-3 md:-top-2 px-1 flex items-center w-full text-xs xs:text-sm md:text-base  font-poppins whitespace-nowrap rounded-2xl transition-all duration-200 ease-in-out cursor-pointer`}
    >
      <span>{firstOption ? dictionary['See all'] : text}</span>
    </motion.li>
  )
}

export default AnimatedDropdown

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -55,
    transition: {
      when: 'afterChildren',
    },
  },
}
