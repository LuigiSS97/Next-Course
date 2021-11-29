import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";

interface Comment {
  id: string;
  body: string;
}

interface CommentsProps {
  comments: Comment[];
}

export default function SinglePost({ comments }: CommentsProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>loading ...</p>;
  }

  return (
    <>
      <h1>Listagem de posts</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CommentsProps> = async (
  context
) => {
  const { id } = context.params;
  const response = await fetch(`http://localhost:3333/comments?postId=${id}`);
  const comments = await response.json();

  return {
    props: {
      comments,
    },
    revalidate: 5,
  };
};
