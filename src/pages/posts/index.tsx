import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { getPrismic } from "../../services/prismic";
import SEO from "../../components/Header/SEO";
import styles from "./posts.module.scss";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
}

interface PostsProps {
  posts: Post[];
}

const { container } = styles;

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <SEO title="Posts" />
      <main className={container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismic();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
    }
  );

  const posts = response.results.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find((content) => content.type === "paragraph")?.text ??
      "",
    updateAt: new Date(post.last_publication_date).toLocaleDateString("pr-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 12,
  };
};
