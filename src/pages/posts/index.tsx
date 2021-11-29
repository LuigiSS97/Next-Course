import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import styles from "../../styles/home.module.scss";

interface Post {
  id: string;
  title: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({posts}: PostsProps) {

  return (
    <div>
     <h1>Listagem de posts</h1>
     <ul>
          {posts.map((post) => (
            <li key={post.id} className={styles.list_item}>{post.title}</li>
          ))}
        </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const response = await fetch("http://localhost:3333/posts")
  const posts = await response.json()
  
  return {
    props: {
      posts,
    },
    revalidate: 5,
  };
}