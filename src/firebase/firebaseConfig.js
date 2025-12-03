import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTWRRD22xIVq4N8yvZDXG69OeZe8ODWSc",
  authDomain: "psychologists-app-f4461.firebaseapp.com",
  databaseURL:
    "https://psychologists-app-f4461-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "psychologists-app-f4461",
  storageBucket: "psychologists-app-f4461.firebasestorage.app",
  messagingSenderId: "924615593222",
  appId: "1:924615593222:web:348da399d247bd17686287",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
