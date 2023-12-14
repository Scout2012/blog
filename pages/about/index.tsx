import React from "react";
import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";

export default function About() {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
      </section>
    </Layout>
  );
}
