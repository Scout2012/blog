import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { fetchPreviews } from "../lib/Posts";
import Link from "next/link";
import Date from "../components/date";
import React from "react";

import utilStyles from "../styles/utils.module.css";

export async function getStaticProps() {
  const allPostsData = await fetchPreviews();
  return {
    props: {
      allPostsData,
    },
    revalidate: 60,
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>software engineer with lots of interests</p>
        <p>please enjoy your stay</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map((post) => (
            <li className={utilStyles.listItem} key={post.params.id}>
              <Link href={`/braindump/${post.params.id}`}>
                <a>{post.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {/* <Date dateString={post.date} /> */}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
