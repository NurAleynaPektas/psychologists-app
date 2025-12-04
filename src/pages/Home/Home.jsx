import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import psyHome from "../../assets/psyHome.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          The road to the <span>depths</span> of the human soul
        </h1>

        <p className={styles.subtitle}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>

        <button
          className={styles.cta}
          onClick={() => navigate("/psychologists")}
        >
          Get started
          <svg
            className={styles.arrow}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.right}>
        <img src={psyHome} alt="Psychologist" className={styles.heroImage} />

        <div className={styles.expertBox}>
          <div className={styles.expertIcon}>
            <span className={styles.check}>✓</span>
          </div>

          <div className={styles.expertText}>
            <p className={styles.expTitle}>Experienced psychologists</p>
            <p className={styles.expNumber}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
