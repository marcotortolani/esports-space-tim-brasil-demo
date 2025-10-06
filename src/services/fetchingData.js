'use server'

import { getVideoPostsByCategoryId } from '@/services/api-content'
import { cleanDataPosts } from '@/utils/functions'

export async function fetchingData({ id, categorySlug, qty, page = 1 }) {
  const { data, posts, pages } = await getVideoPostsByCategoryId({
    id,
    perPage: qty,
    page: page,
  })

  const cardPosts = cleanDataPosts({
    posts: data,
    categorySlug,
  })

  return { cardPosts, posts, pages }
}
