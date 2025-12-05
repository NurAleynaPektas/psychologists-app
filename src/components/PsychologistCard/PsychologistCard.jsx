import { useState } from "react";
import styles from "./PsychologistCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import Modal from "../UI/Modal";
import AppointmentForm from "../Appointment/AppointmentForm";

export default function PsychologistCard({ psychologist }) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

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

  const favorite = isFavorite(psychologist);

  const handleHeartClick = () => {
    if (!user) {
      alert("Only authorized users can manage favorites.");
      return;
    }
    toggleFavorite(psychologist);
  };

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  const openAppointment = () => {
    if (!user) {
      alert("Only authorized users can make an appointment.");
      return;
    }
    setIsAppointmentOpen(true);
  };

  const closeAppointment = () => setIsAppointmentOpen(false);

  return (
    <>
      <article
        className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}
      >
        {/* ÜST SATIR */}
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
                    License:{" "}
                    <span className={styles.metaAccent}>{license}</span>
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
              <span className={styles.infoLabel}>
                <span className={styles.infoStar}>★</span> Rating:
              </span>
              <span className={styles.infoValue}>{rating}</span>
              <span className={styles.infoLabel}>Price / 1 hour:</span>
              <span className={styles.infoPrice}>{price_per_hour}$</span>

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
        </div>

        {/* KISA AÇIKLAMA  */}
        {about && <p className={styles.about}>{about}</p>}

        {/* READ MORE SONRASI AÇILAN KISIM */}
        {isExpanded && Array.isArray(reviews) && reviews.length > 0 && (
          <div className={styles.reviewsSection}>
            <ul className={styles.reviewsList}>
              {reviews.map((rev, index) => (
                <li key={index} className={styles.reviewItem}>
                  <div className={styles.reviewTop}>
                    <span className={styles.reviewerBadge}>
                      {rev.reviewer?.[0] || "U"}
                    </span>
                    <div className={styles.reviewHeaderText}>
                      <span className={styles.reviewerName}>
                        {rev.reviewer || "Anonymous"}
                      </span>
                      {rev.rating && (
                        <span className={styles.reviewRating}>
                          ★ {rev.rating}
                        </span>
                      )}
                    </div>
                  </div>
                  {rev.comment && (
                    <p className={styles.reviewComment}>{rev.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        
        <div className={styles.bottomRow}>
          <button
            className={styles.readMoreBtn}
            type="button"
            onClick={toggleDetails}
          >
            {isExpanded ? "Hide" : "Read more"}
          </button>

          {isExpanded && (
            <button
              className={styles.appointmentBtn}
              type="button"
              onClick={openAppointment}
            >
              Make an appointment
            </button>
          )}
        </div>
      </article>

      {/* APPOINTMENT MODAL*/}
      <Modal
        isOpen={isAppointmentOpen}
        onClose={closeAppointment}
        title={`Make an appointment with ${name}`}
      >
        <AppointmentForm
          psychologist={psychologist}
          onSuccess={closeAppointment}
        />
      </Modal>
    </>
  );
}
