import React from 'react'
import { getDataPostById } from '@/services/api-content'
import { getVimeoNumber } from '@/utils/functions'
import SectionRecommended from '@/app/components/SectionRecommended'
import { CAT_GAMERS as cat } from '@/utils/static_data'
import VideoPost from "@/app/components/page-post/VideoPost"

export default async function VideoPage({ params }) {
  const { id } = params
  const dataVideo = await getDataPostById(id)
  const vimeoNumber = getVimeoNumber({ string: dataVideo?.content.rendered })

  return (
    <VideoPost dataVideo={dataVideo} vimeoNumber={vimeoNumber}>
      <SectionRecommended category={cat.gaming} qty={4} />
    </VideoPost>
  )
}
