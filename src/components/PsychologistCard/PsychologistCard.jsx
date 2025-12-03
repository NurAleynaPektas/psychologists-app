import styles from "./PsychologistCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function PsychologistCard({ psychologist }) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!psychologist || typeof psychologist !== "object") {
    return null;
  }

  const {
    name = "Unknown",
    experience = 0,
    price_per_hour = 0,
    rating = 0,
    specialization = "",
    initial_consultation = "",
    about = "",
    license = "",
    reviews = [],
  } = psychologist;

  const reviewsCount = Array.isArray(reviews)
    ? reviews.length
    : typeof reviews === "number"
    ? reviews
    : 0;

  const favorite = isFavorite(psychologist);

  const handleHeartClick = () => {
    if (!user) {
      alert("Only authorized users can manage favorites.");
      return;
    }
    toggleFavorite(psychologist);
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar} />
          </div>

          <div className={styles.mainInfo}>
            <div className={styles.nameRow}>
              <p className={styles.role}>Psychologist</p>
              <h2 className={styles.name}>{name}</h2>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                Experience:{" "}
                <span className={styles.metaAccent}>{experience} years</span>
              </span>

              {license && (
                <span className={styles.metaItem}>
                  License: <span className={styles.metaAccent}>{license}</span>
                </span>
              )}
            </div>

            <div className={styles.chipRow}>
              {specialization && (
                <span className={styles.chipPrimary}>
                  Specialization: {specialization}
                </span>
              )}

              {initial_consultation && (
                <span className={styles.chipMuted}>
                  Initial consultation: {initial_consultation}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Rating:</span>
            <span className={styles.infoValue}>
              ★ {rating} ({reviewsCount} reviews)
            </span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Price / 1 hour:</span>
            <span className={styles.infoPrice}>{price_per_hour}$</span>
          </div>

          <button
            className={`${styles.heartBtn} ${
              favorite ? styles.heartActive : ""
            }`}
            type="button"
            onClick={handleHeartClick}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>

      {about && <p className={styles.about}>{about}</p>}

      <div className={styles.bottomRow}>
        <button className={styles.readMoreBtn} type="button">
          Read more
        </button>

        <button className={styles.appointmentBtn} type="button">
          Make an appointment
        </button>
      </div>
    </article>
  );
}
