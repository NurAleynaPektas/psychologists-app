import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Register
export const registerUser = async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Firebase kullanıcı profili
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential.user;
};

// Login
export const loginUser = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
