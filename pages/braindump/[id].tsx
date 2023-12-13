import Head from "next/head";
import Layout from "../../components/layout";
import { BrainDumpPost, getAllPostSlugs, getBrainDumpPostById } from "../../lib/Posts";
import Date from "../../components/date";
import React from "react";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getBrainDumpPostById(params.id);
  return {
    props: {
      postData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs,
    fallback: false,
  };
}

export default function Post({ postData }) {
  console.log(postData)
  return (
    <Layout home={undefined}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.postHtml }} />
      </article>
    </Layout>
  );
}
