import { GetServerSideProps } from "next";
import SEO from "../components/Header/SEO";
import styles from "../styles/home.module.scss";

interface Post {
  id: string;
  title: string;
}

interface HomeProps {
  posts: Post[];
}

const { content, section } = styles;

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <SEO title="Home" />
      <main className={content}>
        <section className={section}>
          <span>Olá Dev!</span>
          <h1>
            Bem-vindo(a) <br />
            ao<span> Dev</span>News
          </h1>
          <p>
            Um blog com conteúdos extremamente <br />
            <span>relevantes para o seu aprendizado.</span>
          </p>
        </section>
        <aside>
          <img src="/home.svg" alt="Home Image" />
        </aside>
      </main>
    </>
  );
}
