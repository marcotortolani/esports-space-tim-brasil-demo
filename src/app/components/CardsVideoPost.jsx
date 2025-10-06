import React from 'react';
import { getVideoPostsByCategoryId } from '@/services/api-content.js';
import { cleanDataPosts } from '@/utils/functions.js';
import ShortCard from "./ShortCard.jsx";

export default async function CardsVideoPosts({ id }) {
  const dataVideoPosts = await getVideoPostsByCategoryId({ id });

  const dataVideoPostsCleaned = cleanDataPosts({
    posts: dataVideoPosts,
    categorySlug: 'videos',
    allCategoriesData: '',
    videosCategoryID: id,
  });

  return (
    <div className=" w-full h-full flex justify-center ">
      <ul className=" w-full h-full grid grid-cols-2 grid-rows-1  gap-3 md:gap-4">
        {dataVideoPostsCleaned?.map((post, index) => (
          <ShortCard
            key={post.id}
            qty={dataVideoPostsCleaned.length}
            post={post}
            miniCard
          />
        ))}
      </ul>
    </div>
  );
}