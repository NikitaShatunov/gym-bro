import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase from "../fireBase";

export const fireBaseGetWeight = async (email: string) => {
    const db = getFirestore(firebase);
  const docRef = doc(db, "users-weight", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    
  }
};

export const fireBaseGetHeight = async (email: string) => {
  const db = getFirestore(firebase);
const docRef = doc(db, "users-height", email);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap.data();
} else {
  
}
};

export const fireBaseGetParams = async (email: string) => {
  const db = getFirestore(firebase);
const docRef = doc(db, "users-params", email);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap.data();
} else {
  
}
};
