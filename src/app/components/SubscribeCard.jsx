import Link from 'next/link'
import React from 'react'
import { URL_LANDING_SUBS } from '@/config/config'

import dictionary from '@/dictionary/lang.json'

export default function SubscribeCard() {
  return (
    <div className=" mx-4 sm:mx-auto max-w-[400px] flex flex-col items-center gap-6 mt-40 mb-20 p-6 bg-PrimaryDark text-White rounded-lg shadow-xl">
      <p className=" px-4 text-center">
        {dictionary['You must be subscribed to the service']} <br />
        <span className=" font-semibold uppercase">
          {dictionary['title']}
        </span>. <br />
        {dictionary['Do you want to live the best experiences?']}
      </p>

      <Link
        href={URL_LANDING_SUBS}
        target="_blank"
        className=" font-semibold px-4 uppercase py-2 bg-gradient-to-b from-Tertiary bg-Secondary text-Accent rounded-lg"
      >
        {dictionary['Join Us']}
      </Link>
    </div>
  )
}
