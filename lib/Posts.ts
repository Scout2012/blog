import { AWSDataSource } from "./AwsDataSource";
import { IBlogPost } from "./DataSource";
import { FsDataSource } from "./FsDataSource";
import { MarkdownProcessor } from "./MarkdownProcessor";

interface ISluggable {
  params: {
    id: string;
  };
}

export interface PostPreview extends ISluggable {
  title: string,
  last_modified: Date,
}
export interface Post extends PostPreview {
  content: string,
}

const POST_BUCKET = process.env.POSTS_BUCKET || '';
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || '';
const ACCESS_KEY_SECRET = process.env.ACCESS_KEY_SECRET || '';
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
const REGION = process.env.POSTS_REGION || 'us-east-1';

const dataSource = ENVIRONMENT == "dev"
  ? new FsDataSource()
  : new AWSDataSource(
    {
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: ACCESS_KEY_SECRET
      }
    }
  );

export async function getPostById(id: string): Promise<Post | undefined> {
  const content = await dataSource
    .getById<IBlogPost>(POST_BUCKET, id);
  
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
    params: { id },
    title: title,
    content: post.replace(/^[^\n]*\n/, ''),
    last_modified: content.last_modified,
  };
}

export async function getAllPostSlugs(path: string = POST_BUCKET): Promise<ISluggable[]> {
  const ids = await dataSource
  .getAllIds<string>(path);

  return ids.map(id => { return { params: { id } } } );
}

export async function fetchPreviews(): Promise<PostPreview[]> {
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

    previews.push({
      params: slug.params,
      title: post.title,
      last_modified: post.last_modified,
    });
  }

  return previews.sort((a,b)=>b.last_modified.getTime()-a.last_modified.getTime());
}