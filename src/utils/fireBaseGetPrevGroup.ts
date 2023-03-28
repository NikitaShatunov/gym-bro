import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase from "../fireBase";

export const fireBaseGetPrevGroup = async (email: string) => {
    const db = getFirestore(firebase);
  const docRef = doc(db, "prev-groups", email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    
  }
};
