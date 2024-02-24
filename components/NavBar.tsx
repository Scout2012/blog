import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

import styles from "./navbar.module.css";
import githubIcon from "../public/images/github.svg";
import linkedinIcon from "../public/images/linkedin.svg";

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

export default function NavBar({}) {
  const router = useRouter();

  return (
    <nav>
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
  );
}
