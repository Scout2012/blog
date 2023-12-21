import React from "react";
import Layout from "../../components/Layout";
import { getAllNotes } from "../../lib/Note";

import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  // fetch extra props
  const notes = await getAllNotes();
  // return extra props
  return {
    props: {
    },
    revalidate: 10,
  };
}

// Get all notes
// Scan their tags
// Clump all related tags together
// Make interconnecting links
export default function Research({ subjects }) {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Research Center</h2>
      </section>
    </Layout>
  );
}
