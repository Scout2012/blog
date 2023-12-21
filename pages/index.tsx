import React from "react";
import Layout from "../components/Layout";
import { fetchPreviews } from "../lib/Posts";

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
      <div style={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <p>please enjoy your stay</p>
        <p>the library is always a good place to go when you're unsure what to do</p>
      </div>
    </Layout>
  );
}
