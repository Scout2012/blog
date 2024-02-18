import React from "react";
import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { PostPreview, fetchPreviews } from "../../lib/Posts";

type StaticPropPostPreview = Omit<PostPreview, "last_modified"> & {
  last_modified: string;
};

interface BlogProps {
  allPostsData: StaticPropPostPreview[];
}

export async function getStaticProps() {
  const allPostsData = await fetchPreviews();
  return {
    props: {
      allPostsData: allPostsData.map((preview) => {
        return {
          ...preview,
          last_modified: preview.last_modified.toLocaleDateString("en-US"),
        };
      }),
    },
    revalidate: 10,
  };
}

export default function Library({ allPostsData }: BlogProps) {
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
              <small className={utilStyles.lightText}>
                Jacob Powell, {post.last_modified}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
