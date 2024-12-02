import React from "react";
import Layout from "../../components/Layout";
import utils from "../../styles/utils.module.css";
import { getAboutContent } from "../../lib/data/About";
import { InitialProp } from "../../lib/data/Page";
import { IPost } from "../../lib/data/Posts";
import LoadedImage from "../../components/Image";

export interface AboutProps {
  aboutContent: IPost;
}

export async function getStaticProps(): Promise<InitialProp<AboutProps>> {
  return {
    props: {
      aboutContent: JSON.parse(JSON.stringify(await getAboutContent()))
    },
    revalidate: 10,
  };
}

export default function About(props: AboutProps) {
  return (
    <Layout>
      <article className={utils.about}>
        <div className={utils.card}>
          <h1 className={utils.heading2Xl}>Jacob Powell</h1>
          <h2 className={utils.headingLg}>Software Engineer</h2>
          {LoadedImage()}
        </div>
        {props.aboutContent?.body.split("\n")
          .map((paragraph, index) => {
            return <p key={`about-para-${index}`}>{paragraph}</p>
        })}
      </article>
    </Layout>
  );
}
