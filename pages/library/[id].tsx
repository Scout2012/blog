import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostSlugs, getBrainDumpPostById } from "../../lib/Posts";
import Date from "../../components/Date";
import React from "react";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const post = await getBrainDumpPostById(params.id);
  
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
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.postHtml }} />
      </article>
    </Layout>
  );
}
