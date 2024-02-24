import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";

import utils from "../styles/utils.module.css";
import profilePhoto from "../public/images/me.jpg";

export default function Home() {
  return (
    <Layout>
      <article>
        <h1 className={utils.heading2Xl}>Jacob Powell</h1>
        <h2 className={utils.headingLg}>Software Engineer</h2>
        <Image
          src={profilePhoto}
          alt="me"
          height={220}
          width={267}
          quality={100}
        />
        <p>
          Welcome to my website! I'm currently working at Taco Bell as a
          Software Engineer. I primarily find myself working on backend systems,
          but am versed and experienced with frontend systems as well.
        </p>
        <p>
          I love learning, and am always studying up on the latest within the
          tech and math world. Some specific topics that I find myself always
          coming back to in no particular order: Node, Group Theory,
          Compression, Recommendation Systems, P2P, and many many others.
        </p>
        <p>
          Check out my blog to read up on my latest interests, and check out my
          GitHub to see my latest code!
        </p>
      </article>
    </Layout>
  );
}
