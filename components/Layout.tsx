import Head from "next/head";
import Link from "next/link";
import React from "react";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.css"
        ></link>
      </Head>
      <header>
        <nav>
          <Link href={`/`} legacyBehavior>
            <div>
              <h1>{NAME.split(" ").map((x) => x[0]) /* gets initals*/}</h1>
            </div>
          </Link>
          <ol>
            <Link href={`/about`}>About</Link>
          </ol>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <ul
          className={utilStyles.list}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <li>
            <a href="https://github.com/Scout2012">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jacob-powell-925571121/">
              LinkedIn
            </a>
          </li>
        </ul>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "0.5em",
          }}
        >
          Copyright © 2020-2024 Jacob Powell
        </p>
      </footer>
      <SpeedInsights />
    </div>
  );
}
