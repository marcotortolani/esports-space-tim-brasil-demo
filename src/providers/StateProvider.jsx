'use client';
import React, { createContext, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const StateContext = createContext();
const favouritePostsInitial = [];

function StateProvider({ children }) {
  const [favouritePosts, setFavouritePosts] = useLocalStorage(
    'userFavouritePosts',
    []
  );
  const stateValues = { favouritePosts, setFavouritePosts };

  useEffect(() => {
    if (!favouritePosts) {
      setFavouritePosts(favouritePostsInitial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StateContext.Provider value={stateValues}>
      {stateValues ? children : null}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
