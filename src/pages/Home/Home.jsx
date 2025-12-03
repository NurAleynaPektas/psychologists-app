import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/psychologists");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.badge}>Psychologists services</p>

        <h1 className={styles.title}>
          The road to the <span>depths</span> of the human soul
        </h1>

        <p className={styles.subtitle}>
          We help you find a licensed psychologist who understands you and
          supports your mental health journey.
        </p>

        <button className={styles.cta} onClick={handleGetStarted}>
          Get started
        </button>

        <p className={styles.note}>
          Start your first consultation today and take care of your inner world.
        </p>
      </div>

      <div className={styles.right}>
        <div className={styles.mockCard}>
          <p className={styles.mockLabel}>15,000 experienced psychologists</p>
          <p className={styles.mockText}>
            Choose from a wide range of specialists for online or offline
            sessions.
          </p>
        </div>
      </div>
    </section>
  );
}
