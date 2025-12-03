import styles from "./Favorites.module.css";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function Favorites() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  if (!user) {
    return (
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Favorites</h1>
          <p className={styles.subtitle}>
            Only authorized users can view their favorite psychologists.
          </p>
        </header>

        <div className={styles.content}>
          <p>Please log in to see your favorites.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.subtitle}>
          Here are all psychologists you have added to favorites.
        </p>
      </header>

      <div className={styles.content}>
        {favorites.length === 0 ? (
          <p>You have no favorite psychologists yet.</p>
        ) : (
          <div className={styles.list}>
            {favorites.map((item, index) => (
              <PsychologistCard key={index} psychologist={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
