import React from "react";

import styles from "./layout.module.css";
import NavBar from "./NavBar";
import { NAME } from "../lib/Global";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <p>Made by {NAME}</p>
      </footer>
    </div>
  );
}
