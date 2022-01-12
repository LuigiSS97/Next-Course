import { GetServerSideProps } from "next";
import SEO from "../components/Header/SEO";
import styles from "../styles/home.module.scss";
import Image from "next/image";

const { content, section } = styles;

export default function Home() {
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
          <Image src="/home.svg" alt="home page" />
        </aside>
      </main>
    </>
  );
}
