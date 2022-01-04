import SEO from "../../components/Header/SEO";
import Prismic from "@prismicio/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { getPrismic } from "../../services/prismic";
import styles from "./post.module.scss";

const { container, postStyle, content } = styles;

interface Post {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  };
}

export default function SinglePost({ post }: Post) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>loading ...</p>;
  }

  return (
    <>
      <SEO title="Post" />
      <main className={container}>
        <article className={postStyle}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div
            className={content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const prismic = getPrismic();

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asText(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      "pr-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 12,
  };
};
