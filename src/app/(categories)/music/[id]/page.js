import React from 'react'
import { CAT_MUSIC as cat } from '@/utils/static_data'
import SectionRecommended from '@/app/components/SectionRecommended'
import PagePost from '@/app/components/page-post/PagePost'

export default function page({ params }) {
  const { id } = params

  return (
    <PagePost id={id}>
      <SectionRecommended category={cat.music} qty={6} />
    </PagePost>
  )
}
