import { useEffect, useMemo, useState } from "react";
import styles from "./Psychologists.module.css";
import { fetchPsychologists } from "../../firebase/psychologistsService";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";

export default function Psychologists() {
  const [psychologists, setPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("name-asc"); 

  const loadPsychologists = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchPsychologists();
      console.log("Psychologists from DB:", data);

      let list = [];

      if (!data) {
        list = [];
      } else if (Array.isArray(data)) {
        list = data;
      } else {
        list = Object.values(data);
      }

      setPsychologists(list);

      setVisibleCount((prev) => {
        if (prev === 0) return Math.min(3, list.length);
        return Math.min(prev, list.length);
      });
    } catch (err) {
      console.error("Failed to load psychologists:", err);
      setError("Failed to load psychologists. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPsychologists();

  }, []);

  const handleLoadMore = async () => {
    await loadPsychologists(); 
    setVisibleCount((prev) => prev + 3);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedPsychologists = useMemo(() => {
    const listCopy = [...psychologists];

    return listCopy.sort((a, b) => {
      const nameA = (a.name || "").toLowerCase();
      const nameB = (b.name || "").toLowerCase();
      const priceA = Number(a.price_per_hour || 0);
      const priceB = Number(b.price_per_hour || 0);
      const ratingA = Number(a.rating || 0);
      const ratingB = Number(b.rating || 0);

      switch (sortOption) {
        case "name-asc":
          return nameA.localeCompare(nameB);
        case "name-desc":
          return nameB.localeCompare(nameA);
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "rating-asc":
          return ratingA - ratingB;
        case "rating-desc":
          return ratingB - ratingA;
        default:
          return 0;
      }
    });
  }, [psychologists, sortOption]);

  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPsychologists.length;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Psychologists</h1>
          <p className={styles.subtitle}>
            Browse the list of psychologists, apply filters and add favorites.
          </p>
        </div>

        <div className={styles.sortBox}>
          <label className={styles.sortLabel} htmlFor="sort">
            Sort by:
          </label>
          <select
            id="sort"
            className={styles.sortSelect}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
            <option value="rating-asc">Rating (low to high)</option>
            <option value="rating-desc">Rating (high to low)</option>
          </select>
        </div>
      </header>

      <div className={styles.content}>
        {loading && <p>Loading psychologists...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && sortedPsychologists.length === 0 && (
          <p>No psychologists found.</p>
        )}

        {!loading && !error && visiblePsychologists.length > 0 && (
          <>
            <div className={styles.list}>
              {visiblePsychologists.map((item, index) => (
                <PsychologistCard key={index} psychologist={item} />
              ))}
            </div>

            {hasMore && (
              <button
                className={styles.loadMoreBtn}
                type="button"
                onClick={handleLoadMore}
                disabled={loading}
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
