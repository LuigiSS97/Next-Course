import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../ActiveLink";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <Image src="/logo.svg" alt="DevNews!" width="6rem" height="3.75rem" />
        </Link>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
