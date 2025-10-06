// src/utils/static_data.js

import dictionary from '@/dictionary/lang.json'

export const CAT_GAMERS = {
  // gaming: {
  //   name: dictionary['Gaming'],
  //   wpSlug: 'gaming',
  //   slug: 'gaming',
  // },
  gamers: {
    name: dictionary['Gamers'], //
    wpSlug: 'gamers',
    slug: 'gaming/gamers',
  },

  // cheats: {
  //   name: dictionary['Cheats'],
  //   wpSlug: 'tips-y-trucos',
  //   slug: 'gaming/cheats',
  // },
}

export const CAT_EDITORIAL = {
  editorial: {
    name: dictionary['Editorial'], //
    wpSlug: 'editorial',
    slug: 'editorial',
  },
  videogames: {
    name: dictionary['Videogames'], //
    wpSlug: 'videogames',
    slug: 'editorial/videogames',
  },
  retro: {
    name: dictionary['Retro'], //
    wpSlug: 'retro',
    slug: 'editorial/retro',
  },
  technology: {
    name: dictionary['Technology'], //
    wpSlug: 'technology',
    slug: 'editorial/technology',
  },
}

export const CAT_MUSIC = {
  music: {
    name: dictionary['Music'], //
    wpSlug: 'music',
    slug: 'music',
  },
  trap: {
    name: dictionary['Trap'], //
    wpSlug: 'trap',
    slug: 'music/trap',
  },
  pop: {
    name: dictionary['Pop'], //
    wpSlug: 'pop',
    slug: 'music/pop',
  },
}

export const TEAM_GAMERS_CATEGORIES = { CAT_GAMERS, CAT_EDITORIAL, CAT_MUSIC }
