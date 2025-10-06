import React from 'react'
import { CAT_GAMERS as cat } from '@/utils/static_data'
import { getDataPostById } from '@/services/api-content'
import { getVimeoNumber } from '@/utils/functions'
import VideoPost from '@/app/components/page-post/VideoPost'
import SectionRecommended from '@/app/components/SectionRecommended'

export default async function VideoPageByID({ params }) {
  const { id } = params
  const dataVideo = await getDataPostById(id)
  const vimeoNumber = getVimeoNumber({ string: dataVideo?.content.rendered })

  return (
    <VideoPost dataVideo={dataVideo} vimeoNumber={vimeoNumber}>
      <SectionRecommended category={cat.gaming} qty={4} />
    </VideoPost>
  )
}
