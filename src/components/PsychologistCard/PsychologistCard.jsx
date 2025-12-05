import { useState } from "react";
import styles from "./PsychologistCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import Modal from "../UI/Modal";
import AppointmentForm from "../Appointment/AppointmentForm";

export default function PsychologistCard({ psychologist }) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
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

  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

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

        {about && <p className={styles.about}>{about}</p>}

        <div className={styles.bottomRow}>
          <button
            className={styles.readMoreBtn}
            type="button"
            onClick={openDetails}
          >
            Read more
          </button>

          <button
            className={styles.appointmentBtn}
            type="button"
            onClick={openAppointment}
          >
            Make an appointment
          </button>
        </div>
      </article>

      {/* READ MORE MODAL */}
      <Modal isOpen={isDetailsOpen} onClose={closeDetails} title={name}>
        <div className={styles.details}>
          <div className={styles.detailsHeader}>
            <p className={styles.detailsRole}>Psychologist</p>
            <h2 className={styles.detailsName}>{name}</h2>

            <div className={styles.detailsMetaRow}>
              <span className={styles.detailsMetaItem}>
                Experience:{" "}
                <span className={styles.detailsMetaAccent}>
                  {experience} years
                </span>
              </span>

              {license && (
                <span className={styles.detailsMetaItem}>
                  License:{" "}
                  <span className={styles.detailsMetaAccent}>{license}</span>
                </span>
              )}
            </div>

            <div className={styles.detailsChipRow}>
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

          {about && <p className={styles.detailsAbout}>{about}</p>}

          {Array.isArray(reviews) && reviews.length > 0 && (
            <div className={styles.reviewsSection}>
              <h3 className={styles.reviewsTitle}>Reviews</h3>
              <ul className={styles.reviewsList}>
                {reviews.map((rev, index) => (
                  <li key={index} className={styles.reviewItem}>
                    <div className={styles.reviewTop}>
                      <span className={styles.reviewerName}>
                        {rev.reviewer || "Anonymous"}
                      </span>
                      {rev.rating && (
                        <span className={styles.reviewRating}>
                          ★ {rev.rating}
                        </span>
                      )}
                    </div>
                    {rev.comment && (
                      <p className={styles.reviewComment}>{rev.comment}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>

      {/* APPOINTMENT MODAL */}
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
