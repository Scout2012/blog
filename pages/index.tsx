import React from "react";
import Layout from "../components/Layout";
import { fetchPreviews } from "../lib/Posts";

import utilStyles from "../styles/utils.module.css";
import ExportedImage from "next-image-export-optimizer";

export async function getStaticProps() {
  const allPostsData = await fetchPreviews();
  return {
    props: {
      allPostsData,
    },
    revalidate: 10,
  };
}

export default function Home() {
  return (
    <Layout>
      <p>please enjoy your stay</p>
    </Layout>
  );
}
