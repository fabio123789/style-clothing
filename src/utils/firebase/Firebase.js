import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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

const googlProvider = new GoogleAuthProvider();

googlProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googlProvider);
export const db = getFirestore();

export const createuserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  }
  return userDocRef;
};

export const createAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try{
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  catch(error) {
    if(error.code === "auth/email-already-in-use"){
      return alert("email already in use")
    }
    console.log("something went wrong", error);
  }
};
