'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
//import useLocalStorage from '@/hooks/useLocalStorage'
import { ValidationContext } from '@/providers/ValidationProvider'
import {
  TRIVIA_GAME_HASH,
  ENDPOINT_CREATE_USER,
  // ENDPOINT_GET_TRIVIA_CONFIG,
} from '@/config/config'

import bannerMobile from '/public/assets/img/banner-trivia-450.webp'
import bannerDesktop from '/public/assets/img/banner-trivia-1920.webp'

//const userHash2 = '0cb0a0e96a2cab85'

export default function BannerTrivia() {
  const router = useRouter()
  //const { userEnabled, userID } = useContext(ValidationContext)
  //const [userHash, setUserHash] = useState(null)
  const [popupMessage, setPopupMessage] = useState(false)
  const [bannerEnabled, setBannerEnabled] = useState(false)
  //const [lastUpdated, setLastUpdated] = useLocalStorage('lastUpdated', null)
  // const [validPeriod, setValidPeriod] = useLocalStorage('validPeriod', null)
  const validPeriod = {
    startDate: '2025-02-10 00:00:00',
    endDate: '2028-05-24 23:59:00',
  }
  const userEnabled = true
  const userHash = '1'

  useEffect(() => {
    if (validPeriod) {
      const currentDate = new Date()
      const startingDate = new Date(validPeriod.startDate)
      const endingDate = new Date(validPeriod.endDate)
      setBannerEnabled(currentDate >= startingDate && currentDate <= endingDate)
    }
  }, [])

  // useEffect(() => {
  //   if (!userEnabled && !userID) return

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(ENDPOINT_CREATE_USER, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           game_user_id: userID,
  //         }),
  //       })

  //       const data = await response.json()
  //       if (data && data.user) {
  //         setUserHash(data.user.game_user_id)
  //       }
  //     } catch (error) {
  //       console.error('Error:', error)
  //     }
  //   }

  //   fetchData()
  // }, [userID, userEnabled])

  function handleRedirect() {
    if (!userEnabled) {
      router.push('/subscribe')
      return
    }
    if (!userHash) {
      console.log('No userHash')
      setPopupMessage(true)
      return
    }
    // console.log('redireccion a trivia con user hash: ', userHash)

    window.open(`${TRIVIA_GAME_HASH}&userhash=${userHash}`, '_blank')
  }

  useEffect(() => {
    if (popupMessage) {
      setTimeout(() => {
        setPopupMessage(false)
      }, 3000)
    }
  }, [popupMessage])

  if (!bannerEnabled) {
    return null
  }

  return (
    <div
      className={` relative w-full px-2 md:px-0 h-fit my-6 overflow-hidden rounded-xl lg:rounded-3xl `}
    >
      <button
        onClick={handleRedirect}
        className=" relative w-full h-fit overflow-hidden border-2 border-Primary active:border-Primary focus:border-Primary rounded-[inherit] "
      >
        <div
          onClick={handleRedirect}
          className=" w-full h-fit md:px-0 rounded-[inherit] "
        >
          <Image
            className=" w-full h-full md:hidden rounded-[inherit]"
            src={bannerMobile}
            alt="Banner Trivia"
          />
          <Image
            className=" w-full h-full hidden md:block rounded-[inherit]"
            src={bannerDesktop}
            alt="Banner Trivia"
          />
        </div>
      </button>
      <div
        className={`${
          popupMessage ? ' translate-y-0 ' : ' translate-y-[100%] '
        } absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out bg-black/40 backdrop-blur-sm pointer-events-none z-50 rounded-[inherit]`}
      >
        <div className=" w-4/5 md:w-3/5 h-3/5 md:h-1/5 flex items-center justify-center uppercase font-montserrat font-medium text-black bg-Primary text-center rounded-xl">
          {dictionary['Invalid user or no subscription']}
        </div>
      </div>
    </div>
  )
}
