import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import SEO from "../components/Header/SEO";
import styles from "../styles/home.module.scss";

interface Post {
  id: string;
  title: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <div>
        <SEO title="Home"/>
        <h1>Home</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className={styles.list_item}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/posts");
  const posts = await response.json();
  return {
    props: {
      posts,
    },
  };
};
