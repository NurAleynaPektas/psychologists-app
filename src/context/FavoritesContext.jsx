import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);
const STORAGE_PREFIX = "favorites_";

function getPsyId(psychologist) {
  if (!psychologist) return null;
  return psychologist.id ?? psychologist._id ?? psychologist.name ?? null;
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const key = STORAGE_PREFIX + user.uid;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const key = STORAGE_PREFIX + user.uid;
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites, user]);

  const isFavorite = (psychologist) => {
    const id = getPsyId(psychologist);
    if (!id) return false;
    return favorites.some((p) => getPsyId(p) === id);
  };

  const toggleFavorite = (psychologist) => {
    const id = getPsyId(psychologist);
    if (!id) return;

    setFavorites((prev) => {
      if (prev.some((p) => getPsyId(p) === id)) {
        
        return prev.filter((p) => getPsyId(p) !== id);
      }
     
      return [...prev, psychologist];
    });
  };

  const value = { favorites, isFavorite, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
