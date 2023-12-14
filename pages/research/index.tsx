import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import { fetchPreviews } from "../../lib/Posts";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  // fetch extra props

  // return extra props
  return {
    props: {
    },
    revalidate: 10,
  };
}

export default function Research({ subjects }) {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Research Center</h2>
      </section>
    </Layout>
  );
}
