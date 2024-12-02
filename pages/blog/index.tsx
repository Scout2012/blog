import React from "react";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";

import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { PostPreview, getPreviews } from "../../lib/data/Posts";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGE, POSTS_PER_PAGE } from "../../lib/Global";

type StaticPropPostPreview = Omit<PostPreview, "last_modified"> & {
  last_modified: string;
};

interface BlogProps {
  allPostsData: StaticPropPostPreview[];
}

export async function getStaticProps() {
  const allPostsData = await getPreviews();
  const enrichedPostData = allPostsData.map((preview) => {
    return {
      ...preview,
      last_modified: preview.last_modified.toLocaleDateString("en-US"),
    };
  });

  return {
    props: {
      allPostsData: enrichedPostData,
    },
    revalidate: 10,
  };
}

export default function Library({ allPostsData }: BlogProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page =
    Number(pageParam) >= DEFAULT_PAGE ? Number(pageParam) : DEFAULT_PAGE;
  const amountofPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE);
  const currentSlice =
    page > amountofPages ? amountofPages : POSTS_PER_PAGE * (page - 1);

  return (
    <Layout>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.flexCenter}`}
      >
        <h2 className={utilStyles.headingLg}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData
            .slice(currentSlice, currentSlice + POSTS_PER_PAGE)
            ?.map((post) => (
              <li className={utilStyles.listItem} key={post.params.id}>
                <Link href={`/blog/${post.params.id}`}>{post.title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  Jacob Powell, {post.last_modified}
                </small>
              </li>
            ))}
        </ul>
        <Pagination totalPages={amountofPages} page={page} />
      </section>
    </Layout>
  );
}
