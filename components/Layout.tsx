import Head from "next/head";
import Link from "next/link";
import React from "react";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import { SpeedInsights } from "@vercel/speed-insights/next"

const NAME = "jacob powell";
export const SITE_TITLE = "jacobs brain";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="og:title" content={SITE_TITLE} />
        <title>{SITE_TITLE}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.css"></link>
      </Head>
      <header className={styles.header}>
        <nav className={styles.mainNav}>
          <Link href={`/`} legacyBehavior>
            <div className={styles.me}>
              <h1 className={utilStyles.heading2Xl}>{NAME.split(" ").map(x => x[0])}</h1>
            </div>
          </Link>
          <ol className={styles.pages}>
            <Link href={`/library`}>
              The Library
            </Link>
            <Link href={`/projects`}>
              Projects
            </Link>
            <Link href={`/research`}>
              Research Center
            </Link>
            <Link href={`/about`}>
              About
            </Link>
          </ol>
        </nav>
      </header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <ul className={utilStyles.list} style={{display: "flex", justifyContent: "space-evenly"}}>
          <li><a href="https://github.com/Scout2012">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/jacob-powell-925571121/">LinkedIn</a></li>
        </ul>
        <p style={{display: "flex", justifyContent: "center", marginBottom: "0.5em"}}>Copyright © 2020-2024 Jacob Powell</p>
      </footer>
      <SpeedInsights />
    </div>
  );
}
