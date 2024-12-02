export const NAME = "jacob powell";
export const POSTS_PER_PAGE = 5;
export const DEFAULT_PAGE = 1;
export const DATA_LOCATION = process.env.DATA_LOCATION ?? '';
export const POSTS_LOCATION = process.env.POSTS_LOCATION ?? '';
export const BLOG_POSTS_LOCATION= `${POSTS_LOCATION}/${process.env.BLOG_POSTS_LOCATION ?? ''}`;
export const IMAGES_LOCATION = process.env.IMAGES_LOCATION ?? '';