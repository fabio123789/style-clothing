import { initializeApp } from "firebase/app";
import { Category } from '../../store/categories/categoryTypes.ts';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaxMSnKEKFFiqyAi8JX2m6D5lrUAx-lp0",
  authDomain: "style-clothing-db-b2f82.firebaseapp.com",
  projectId: "style-clothing-db-b2f82",
  storageBucket: "style-clothing-db-b2f82.appspot.com",
  messagingSenderId: "203571636539",
  appId: "1:203571636539:web:c12879f9b2dc7e0ebeaf1e",
};

initializeApp(firebaseConfig);

const googlProvider = new GoogleAuthProvider();

googlProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googlProvider);
export const db = getFirestore();

export type ObjectToAdd = {
  title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectstoAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectstoAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};



export const getCategoriesAndDocuments = async (path: string): Promise<Category[]> => {
  const collectionRef = collection(db, path);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date
  displayName: string
  email: string
}

export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserEmailAndPassword = async (email: string, password: string) => {
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

export const signinAuthUserEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("something went wrong", error);
  }
};

export const signoutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);


export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject
    )
  })
}