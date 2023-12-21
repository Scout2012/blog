import React from "react";
import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  // fetch extra props

  // return extra props
  return {
    props: {},
    revalidate: 10,
  };
}

export default function Projects({ projects }) {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Latest Projects</h2>
      </section>
    </Layout>
  );
}
