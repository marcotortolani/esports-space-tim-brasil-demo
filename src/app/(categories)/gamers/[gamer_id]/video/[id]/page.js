import React from 'react'
import { CAT_EDITORIAL as cat } from '@/utils/static_data'
import { getDataPostById } from '@/services/api-content'
import VideoPost from '@/app/components/page-post/VideoPost'
import SectionRecommended from '@/app/components/SectionRecommended'

export default async function PostsGamerPage({ params }) {
  const { id } = params
  const dataVideo = await getDataPostById(id)

  return (
    <VideoPost dataVideo={dataVideo}>
      <SectionRecommended category={cat.videogames} qty={6} />
    </VideoPost>
  )
}
