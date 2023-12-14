import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostSlugs, getBrainDumpPostById } from "../../lib/Posts";
import Date from "../../components/Date";
import React from "react";

import utilStyles from "../../styles/utils.module.css";

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
