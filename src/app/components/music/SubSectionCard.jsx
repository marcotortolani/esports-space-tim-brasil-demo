import Image from 'next/image'
import Link from 'next/link'
import ImageMissing from '../ImageMissing'
import { getPostsByCategoryId } from '@/services/api-content'
import { cleanDataPosts, getLatestPosts } from '@/utils/functions'

import { cn } from '@/lib/utils'

export default async function SubSectionCard({
  categoryId,
  categorySlug,
  title,
  colorCard = 'bg-white',
}) {
  const { data } = await getPostsByCategoryId({
    id: categoryId,
    page: 1,
    tagExclude: 72,
  })

  const latestPosts = cleanDataPosts({
    posts: getLatestPosts({ posts: data, qty: 10 }),
    categorySlug: categorySlug,
  })
  const post = latestPosts[Math.floor(Math.random() * latestPosts.length)]

  return (
    <Link
      href={`/${categorySlug}`}
      className={cn(
        ` relative w-full h-full rounded-md md:rounded-lg lg:rounded-xl p-2 md:p-4 `,
        colorCard
      )}
    >
      <div
        className={` relative w-full h-full  rounded-[inherit] overflow-hidden`}
      >
        {post?.images?.length > 0 ? (
          <Image
            className={`  w-full h-full  object-center object-cover  rounded-[inherit]`}
            fill={true}
            sizes="(max-width: 350px)"
            src={post?.images[0]}
            alt={`Image ${post?.title}`}
          />
        ) : (
          <ImageMissing />
        )}
        <div className=" absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black/60 ">
          <h3
            className={` text-white font-druk tracking-wider uppercase text-start text-4xl md:text-3xl lg:text-[5rem] `}
          >
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
