import { InitialProp } from "../lib/data/Page";
import { getAboutContent } from "../lib/data/About";
import About, { AboutProps } from "./about";

interface HomeProps {
  homeContent: { aboutProps: AboutProps };
}

export async function getStaticProps(): Promise<InitialProp<HomeProps>> {
  return {
    props: {
      homeContent: {
        aboutProps: {
          aboutContent: JSON.parse(JSON.stringify(await getAboutContent())),
        }
      }
    },
    revalidate: 10,
  };
}

export default function Home(props: HomeProps) {
  return About(props.homeContent.aboutProps);
}
