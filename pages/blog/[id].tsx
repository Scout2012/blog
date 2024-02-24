import Head from "next/head";
import Layout from "../../components/Layout";
import { Post, getAllPostSlugs, getPostById } from "../../lib/data/Posts";
import React from "react";

import utilStyles from "../../styles/utils.module.css";
import blogStyles from "./blog.module.css";

type StaticPropPostPreview = Omit<Post, "last_modified"> & {
  last_modified: string;
};

interface BlogPostProps {
  post: StaticPropPostPreview;
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const post = await getPostById(params.id);

  // return new props
  return {
    props: {
      post: {
        ...post,
        last_modified: post?.last_modified.toLocaleDateString("en-US"),
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const slugs = await getAllPostSlugs();

  // return all path ids
  return {
    paths: slugs,
    fallback: "blocking",
  };
}

export default function Blog({ post }: BlogPostProps) {
  return (
    <Layout>
      <article>
        <Head>
          <title>{post.title}</title>
        </Head>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <small className={utilStyles.lightText}>{post.last_modified}</small>
        <div
          className={blogStyles.articleContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  );
}
