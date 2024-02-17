import Head from "next/head";
import React from "react";

import styles from "./layout.module.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import Image from "next/image";
import githubIcon from "../public/images/github.svg";
import linkedinIcon from "../public/images/linkedin.svg";
import { useRouter } from "next/router";

export const SITE_TITLE = "Jacob Powell";

interface Route {
  title: string;
  path: string;
}

interface Social {
  name: string;
  url: string;
  icon: string;
}

const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jacob-powell-925571121/",
    icon: linkedinIcon,
  },
  {
    name: "GitHub",
    url: "https://www.github.com/Scout2012",
    icon: githubIcon,
  },
];

const PAGES: Route[] = [
  { title: "About", path: "/" },
  { title: "Blog", path: "/blog" },
];

export default function Layout({ children }) {
  const router = useRouter();

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
        <nav className={styles.nav}>
          <ul className={styles.routes} key="routes">
            {PAGES.map((route) => {
              return (
                <li
                  className={`${
                    router.pathname === route.path ? styles.active : null
                  }`}
                  key={`li-${route.title.toLowerCase()}`}
                >
                  <Link
                    href={route.path}
                    key={`routes-${route.title.toLowerCase()}`}
                  >
                    {route.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className={styles.socials} key="socials">
            {SOCIALS.map((social) => (
              <li key={`socials-${social.name.toLowerCase()}`}>
                <a href={social.url}>
                  <Image
                    src={social.icon}
                    width={35}
                    height={35}
                    alt={social.name}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Made by Jacob Powell</p>
      </footer>
      <SpeedInsights />
    </div>
  );
}
