import Layout from "../../components/Layout";
import React from "react";

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  
  // return new props
  return {
    props: {},
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  // return all path ids
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default function Project({ project }) {
  return (
    <Layout>
      <h1>WIP</h1>
    </Layout>
  );
}
