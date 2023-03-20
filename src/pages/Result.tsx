import { addDoc, collection, doc, getDocs, getFirestore, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import React from "react"
import firebase from "../fireBase";
import { useAppSelector } from "../redux/redux"

export interface Exercise {
    name: string;
    type: string;
    weight: number;
    reps: number;
    id: number;
  }
 
  
export const Result = () => {
  const [result, setResult] = React.useState<Exercise[]>([]);
  const doneExercises = useAppSelector(state => state.exercise.doneExercises);
  const mail = useAppSelector(state => state.user.mail);
  const date = new Date();
  
  React.useEffect(() => {
    const db = getFirestore(firebase);
    
    if (mail !== null) {
      
      doneExercises.forEach(exercise => {
        const userExercisesRef = collection(db, "users", mail, `${exercise.type}`);
        addDoc(userExercisesRef, {date: date.toLocaleString().split(', ')[0], ...exercise})
          .then(() => {
            console.log("Exercise added to Firestore:", exercise);
          })
          .catch(error => {
            console.error("Error adding exercise to Firestore:", error);
          });
      });
    
    }
  }, [doneExercises, mail]);
 
  
    return(
        <>
        <div className="main__paragraph">Сегодня Вы сделали:</div>
        </>
    )
}