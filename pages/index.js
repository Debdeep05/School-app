import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to Schools App</h1>
        <p className={styles.subtitle}>Manage and explore schools easily </p>

        <Link href="/addSchool" className={styles.button}>
           Add a School
        </Link>

        <Link href="/showSchools" className={`${styles.button} ${styles.show}`}>
           Show Schools
        </Link>
      </div>
    </main>
  );
}

