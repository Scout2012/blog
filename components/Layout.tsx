import Head from "next/head";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import React from "react";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "jacob powell";
export const siteTitle = "jacobs brain";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <header className={styles.header}>
        <nav className={styles.mainNav}>
          <Link href={`/`}>
            <div className={styles.me}>
              <ExportedImage
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name.split(" ").map(x => x[0])}</h1>
            </div>
          </Link>
          <ol className={styles.pages}>
            <Link href={`/library`}>
              <a>The Library</a>
            </Link>
            <Link href={`/projects`}>
              <a>Projects</a>
            </Link>
            <Link href={`/research`}>
              <a>Research Center</a>
            </Link>
            <Link href={`/about`}>
              <a>About</a>
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
    </div>
  );
}
