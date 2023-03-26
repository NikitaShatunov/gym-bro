import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase from "../fireBase";

export const fireBaseGetUser = async (email: string) => {
    const db = getFirestore(firebase);
  const docRef = doc(db, "users-props", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};
