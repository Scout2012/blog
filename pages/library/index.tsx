import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import { fetchPreviews } from "../../lib/Posts";

import utilStyles from "../../styles/utils.module.css";

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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.flexCenter}`}>
        <h2 className={utilStyles.headingLg}>The Library's Latest Entries</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map((post) => (
            <li className={utilStyles.listItem} key={post.params.id}>
              <Link href={`/library/${post.params.id}`}>
                <a>{post.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
