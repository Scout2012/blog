import React from "react";
import Layout from "../../components/Layout";

import utilStyles from "../../styles/utils.module.css";
import blogStyles from "./blog.module.css";

export default function Blog() {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section>
    </Layout>
  );
}
