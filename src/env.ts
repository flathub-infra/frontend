import { Category } from './types/Category'

const BASE_URI: string = process.env.API_BASE_URI

export const APPSTREAM_URL: string = `${BASE_URI}/appstream`
export const APP_DETAILS = (id: string): string => `${APPSTREAM_URL}/${id}`
export const SUMMARY_DETAILS = (id: string): string =>
  `${BASE_URI}/summary/${id}`
export const STATS_DETAILS = (id: string): string => `${BASE_URI}/stats/${id}`
export const STATS = `${BASE_URI}/stats`
export const SEARCH_APP = (query: string): string =>
  `${BASE_URI}/search/${encodeURIComponent(query)}`
export const POPULAR_URL: string = `${BASE_URI}/popular`
export const EDITORS_PICKS_GAMES_URL: string = `${BASE_URI}/picks/games`
export const EDITORS_PICKS_APPS_URL: string = `${BASE_URI}/picks/apps`
export const RECENTLY_UPDATED_URL: string = `${BASE_URI}/collection/recently-updated`
export const CATEGORY_URL = (category: keyof typeof Category): string =>
  `${BASE_URI}/category/${category}`
export const DEVELOPERS_URL = `${BASE_URI}/developer`
export const DEVELOPER_URL = (developer: string): string =>
  `${BASE_URI}/developer/${encodeURIComponent(developer)}`
export const FEED_RECENTLY_UPDATED_URL: string = `${BASE_URI}/feed/recently-updated`
export const FEED_NEW_URL: string = `${BASE_URI}/feed/new`

export const APPS_IN_PREVIEW_COUNT: number = 6

export const IMAGE_BASE_URL: string = `${process.env.NEXT_PUBLIC_SITE_BASE_URI}/img/`
