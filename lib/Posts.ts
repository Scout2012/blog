import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { AWSDataSource } from "./AwsDataSource";
import { FsDataSource } from "./FsDataSource";

type PostData = string | Buffer;

interface ISluggable {
  params: {
    id: string;
  };
}
interface IPost extends ISluggable {
  title: string;
  date: string;
}
interface PostPreviews extends IPost {}
interface IPostMetadata {
  id: string;
  title: string;
  date: Date;
}
// Copied from gray-matter.d.ts and modified
interface GrayMatterFile<I extends PostData> {
  data: { [key: string]: any };
  content: string
  excerpt?: string
  orig: I
  language: string
  matter: string
  stringify(lang: string): string
}
export interface BrainDumpPost extends IPost {
  postHtml: string,
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

export async function getBrainDumpPostById(id: string): Promise<BrainDumpPost | undefined> {
  const content = await dataSource
    .getById<string>(POST_BUCKET, id);
  
  if (!content)
  {
    return undefined;
  }
  
  // Use gray-matter to parse the post metadata section
  const matterResult: GrayMatterFile<PostData> = matter(content);
  const metadata = matterResult.data as IPostMetadata;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  if (!contentHtml)
  {
    return undefined;
  }

  return {
    params: { id },
    title: metadata.title,
    date: metadata.date.toISOString(),
    postHtml: contentHtml,
  }
}

export async function getAllPostSlugs(path: string = POST_BUCKET): Promise<ISluggable[]> {
  const ids = await dataSource
  .getAllIds<string>(path);

  return ids.map(id => { return { params: { id } } } );
}

export async function fetchPreviews(): Promise<PostPreviews[]> {
  let previews: PostPreviews[] = [];
  const slugs = await getAllPostSlugs();
  
  for(const slug of slugs)
  {
    const id = slug.params.id;
    const content = await getBrainDumpPostById(id);

    if(!content)
    {
      continue;
    }

    previews.push({
      params: slug.params,
      title: content.title,
      date: content.date,
    });
  }

  return previews;
}