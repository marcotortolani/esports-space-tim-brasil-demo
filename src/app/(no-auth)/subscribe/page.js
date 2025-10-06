import SubscribeCard from '@/app/components/SubscribeCard'

export default function Page() {
  return (
    <main
      className={` relative z-20 mt-0 snap-y snap-mandatory  w-full max-w-screen-xl overflow-y-hidden h-screen flex flex-col items-center`}
    >
      <div className=" snap-start relative w-full lg:max-w-4xl flex flex-col items-center pt-20 md:pt-32">
        <SubscribeCard />
      </div>
    </main>
  )
}
