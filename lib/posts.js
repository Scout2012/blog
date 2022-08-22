import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import AWS from "aws-sdk";
var s3 = new AWS.S3();

// Get all posts from S3
export async function getPostContent(fileName) {
  const file = await s3
    .getObject({
      Bucket: "jacob-powell-blog-posts",
      Key: `${fileName}.md`,
    })
    .promise()
    .catch((e) => console.log("ERROR", e));
  return file.Body.toString("utf-8");
}

// Sort all the posts by their date
export async function getSortedPostsData() {
  const fileNames = await getAllPostIds();

  // Get file names under /posts
  const allPostsData = fileNames.map(async (fileName) => {
    const id = fileName.params.id;
    const postContent = await getPostContent(id);
    const matterContent = getFixedMatterContent(postContent)

    // Combine the data with the id
    return {
      id,
      ...matterContent.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

// Get all the 'id's or file names for each post
export async function getAllPostIds() {
  const fileNames = [];
  var params = {
    Bucket: "jacob-powell-blog-posts",
    MaxKeys: 2,
  };
  let post_bucket = await s3
    .listObjectsV2(params)
    .promise()
    .catch((e) => console.log(e));
  if (post_bucket?.KeyCount <= 0) {
    console.log("No Posts Available");
  }

  for (const post_index in post_bucket?.Contents) {
    fileNames.push(post_bucket?.Contents[post_index]?.Key);
  }

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// Get the data from each S3 post and convert them to HTML
export async function getPostData(id) {

  // Retrieve posts from S3
  const fileContents = await getPostContent(id);

  // Use gray-matter to parse the post metadata section
  const matterResult = getFixedMatterContent(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getFixedMatterContent(markdownFileContents) {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(markdownFileContents);
  matterResult.data.date = new Date(matterResult.data.date).toISOString();
  return matterResult;
}