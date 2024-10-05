import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useReducer } from "react";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "blogwebsite-155cf.firebaseapp.com",
  projectId: "blogwebsite-155cf",
  storageBucket: "blogwebsite-155cf.appspot.com",
  messagingSenderId: "906476367439",
  appId: "1:906476367439:web:bbaf867d7b0d962630443a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const register = async (email, username, password, file) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await setDoc(userRef, {
      email,
      username,
      avatar: null,
      blogs: [],
      id: user.uid,
    });

    if (file) {
      const imageRef = ref(storage, `/avatars/${user.uid}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      await setDoc(userRef, { avatar: downloadURL }, { merge: true });
    }

    toast.success("User created!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.replace(/[/-]/g, " "));
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Succes");
  } catch (error) {
    console.log(error);
    toast.error(error.code.replace(/[/-]/g, " "));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.replace(/[/-]/g, " "));
  }
};
