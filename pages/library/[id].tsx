import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostSlugs, getPostById } from "../../lib/Posts";
import React from "react";

import utilStyles from "../../styles/utils.module.css";
import postStyles from "./post.module.css";

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const post = await getPostById(params.id);
  
  // return new props
  return {
    props: {
      post,
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
    fallback: 'blocking',
  };
}

export default function Post({ post }) {
  return (
    <Layout>
        <article className={postStyles.article}>
          <Head>
            <title>{post.title}</title>
          </Head>
          <h1 className={utilStyles.headingXl}>{post.title}</h1>
          <div className={postStyles.articleContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    </Layout>
  );
}
