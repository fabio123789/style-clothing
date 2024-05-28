//import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDaxMSnKEKFFiqyAi8JX2m6D5lrUAx-lp0",
//   authDomain: "style-clothing-db-b2f82.firebaseapp.com",
//   projectId: "style-clothing-db-b2f82",
//   storageBucket: "style-clothing-db-b2f82.appspot.com",
//   messagingSenderId: "203571636539",
//   appId: "1:203571636539:web:c12879f9b2dc7e0ebeaf1e",
// };

// const app = initializeApp(firebaseConfig);

const googlProvider = new GoogleAuthProvider();

googlProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googlProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectstoAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectstoAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  }
  return userDocRef;
};

export const createAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return alert("email already in use");
    }
    console.log("something went wrong", error);
  }
};

export const signinAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("something went wrong", error);
  }
};

export const signoutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
