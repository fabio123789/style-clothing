import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaxMSnKEKFFiqyAi8JX2m6D5lrUAx-lp0",
  authDomain: "style-clothing-db-b2f82.firebaseapp.com",
  projectId: "style-clothing-db-b2f82",
  storageBucket: "style-clothing-db-b2f82.appspot.com",
  messagingSenderId: "203571636539",
  appId: "1:203571636539:web:c12879f9b2dc7e0ebeaf1e",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createuserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  }
  return userDocRef;
};
