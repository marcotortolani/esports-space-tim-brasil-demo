import React from 'react'
import dynamic from 'next/dynamic'
import Loading from './components/skeleton/Loading'

const Hero = dynamic(() => import('./components/home/Hero'), {
  loading: () => <Loading />,
})

const GamingSummary = dynamic(() => import('./components/home/GamingSummary'), {
  loading: () => <Loading />,
})
const EditorialsSummary = dynamic(
  () => import('./components/home/EditorialsSummary'),
  { loading: () => <Loading /> }
)
const MusicSummary = dynamic(() => import('./components/home/MusicSummary'), {
  loading: () => <Loading />,
})

export default async function Home() {
  return (
    <main className=" z-0 relative overflow-x-hidden w-full container top-[6rem] md:top-[7rem] lg:top-[8rem] px-4 flex flex-col items-center gap-2 xs:gap-10 sm:gap-6 ">
      <Hero />
      <GamingSummary />
      <EditorialsSummary />
      <MusicSummary />
      <div className="w-full h-[12rem] md:h-[15rem] lg:h-[20rem]"></div>
    </main>
  )
}
