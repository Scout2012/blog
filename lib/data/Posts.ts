import { getDataSource } from "../DataSource";
import { BLOG_POSTS_LOCATION } from "../Global";
import { MarkdownProcessor } from "../processing/MarkdownProcessor";

const DATA_SOURCE = getDataSource();

interface Slug {
  params: {
    id: string;
  };
}

export interface IPost {
  body: string;
  last_modified: Date;
}

export interface PostPreview extends Slug {
  title: string,
  last_modified: Date,
}
export interface Post extends PostPreview {
  content: string,
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const content = await DATA_SOURCE
    .getById<IPost>(`${BLOG_POSTS_LOCATION}/${id}.md`);

  if (!content)
  {
    return undefined;
  }

  const post = MarkdownProcessor.process(content.body);
  const titleRegex = /<p><strong>(.*?)<\/strong><\/p>/;
  const titleMatch = post
    .split('\n')[0] // We assume first line will be title
    .match(titleRegex); // Clear out the HTML from the title
  const title = titleMatch ? titleMatch[1] : id; // Get cleaned title or fallback to slug


    return {
      params: { id: id.replace(`${BLOG_POSTS_LOCATION}/`, "") },
      title: title,
      content: post.replace(/^[^\n]*\n/, ''),
      last_modified: content.last_modified,
    };
}

export async function getAllPostSlugs(): Promise<Array<Slug>> {
  const ids = await DATA_SOURCE
  .getAllIds<string>(BLOG_POSTS_LOCATION);

  return ids.map(id => { return { params: { id: id.replace(`${BLOG_POSTS_LOCATION}/`, "") } } } );
}

export async function getPreviews(): Promise<Array<PostPreview>> {
  let previews: PostPreview[] = [];
  const slugs = await getAllPostSlugs();

  for(const slug of slugs)
  {
    const post = await getPostById(slug.params.id);

    if (!post)
    {
      console.error("Post ID found but unable to fetch content: ", slug.params.id)
      continue;
    }

    previews.push(post);
  }

  return previews.sort((a,b)=>b.last_modified.getTime()-a.last_modified.getTime());
}