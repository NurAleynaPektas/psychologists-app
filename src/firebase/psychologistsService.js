import { ref, get } from "firebase/database";
import { db } from "./firebaseConfig";

export const fetchPsychologists = async () => {
  
  const rootRef = ref(db);
  const snapshot = await get(rootRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.psychologists)) {
    return data.psychologists;
  }

  if (data.psychologists && typeof data.psychologists === "object") {
    return Object.values(data.psychologists);
  }

  return [];
};
