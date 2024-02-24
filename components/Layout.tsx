import Head from "next/head";
import React from "react";

import styles from "./layout.module.css";
import NavBar from "./NavBar";

export const SITE_TITLE = "Jacob Powell";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="og:title" content={SITE_TITLE} />
        <title>{SITE_TITLE}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.css"
        ></link>
      </Head>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <p>Made by Jacob Powell</p>
      </footer>
    </div>
  );
}
