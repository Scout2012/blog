import React from "react";
import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { fetchPreviews } from "../../lib/Posts";

export async function getStaticProps() {
  const allPostsData = await fetchPreviews();
  return {
    props: {
      allPostsData,
    },
    revalidate: 10,
  };
}

export default function Library({ allPostsData }) {
  return (
    <Layout>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.flexCenter}`}
      >
        <h2 className={utilStyles.headingLg}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map((post) => (
            <li className={utilStyles.listItem} key={post.params.id}>
              <Link href={`/blog/${post.params.id}`}>{post.title}</Link>
              <br />
              <small className={utilStyles.lightText}>Jacob Powell</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
