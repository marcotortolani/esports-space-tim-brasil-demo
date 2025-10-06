import React from 'react'
import PagePost from '@/app/components/page-post/PagePost'

export default function page({ params }) {
  const { id } = params

  return <PagePost id={id} />
}
