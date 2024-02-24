import React from "react";
import "../styles/global.css";
import Head from "next/head";
import { NAME } from "../lib/Global";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>{NAME}</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
