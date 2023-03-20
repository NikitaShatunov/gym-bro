import { collection, collectionGroup, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebase from "../fireBase";
import { Exercise } from "../pages/Result";

export async function fetchDB(mail: string, name: string, exs: string) {
    const db = getFirestore(firebase);
    const userExercisesRef = collection(db, "users", mail, `${exs}`);
    let exercises: any = [];
    const query1 = query(
      userExercisesRef,
      where("name", "==", `${name}`),
      where("type", "==", `${exs}`)
    );
    await getDocs(query1).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const exercise = doc.data() as Exercise;
        exercises.push(exercise);
      });
    });
   
    exercises.sort((a: any, b: any) => {
        if (a.weight !== b.weight) {
          return b.weight - a.weight;
        }
        return b.reps - a.reps;
      });

    return exercises[0]
  }