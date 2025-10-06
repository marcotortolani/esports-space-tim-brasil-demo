'use client'
import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share'

import {
  FacebookIcon,
  XtwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from '@/utils/icons'

import dictionary from '@/dictionary/lang.json'

export default function ShareSocialMedia({ title, category }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  return (
    <div className=" flex items-center justify-center flex-wrap gap-2">
      <FacebookShareButton url={url} hashtag={dictionary['siteName']}>
        <FacebookIcon w={30} h={30} />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        hashtags={[dictionary['siteName'], 'gamers', 'streaming', category]}
      >
        <XtwitterIcon w={30} h={30} />
      </TwitterShareButton>
      <WhatsappShareButton
        url={url}
        title={`${dictionary['Check out this post from eSports Space']}: ${title}`}
      >
        <WhatsappIcon w={30} h={30} />
      </WhatsappShareButton>
      <TelegramShareButton
        url={url}
        title={`${dictionary['Check out this post from eSports Space']}: ${title}`}
      >
        <TelegramIcon w={30} h={30} />
      </TelegramShareButton>
    </div>
  )
}
