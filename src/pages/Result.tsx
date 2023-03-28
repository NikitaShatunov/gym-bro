import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react"
import { Link } from "react-router-dom";
import firebase from "../fireBase";
import { useAppDispatch, useAppSelector } from "../redux/redux"
import { setDate } from "../redux/slices/dateSLice";
import { clearStateExercises } from "../redux/slices/exerciseSlice";

export interface Exercise {
    name: string;
    type: string;
    weight: number;
    reps: number;
    id: number;
  }
 
  
export const Result = () => {
  const doneExercises = useAppSelector(state => state.exercise.doneExercises);
  const mail = useAppSelector(state => state.user.mail);
  const muscleGroup = useAppSelector(state => state.exercise.muscleGroup)
  const dispatch = useAppDispatch()
  const date = new Date();
  
  React.useEffect(() => {
    const db = getFirestore(firebase);
    dispatch(setDate(date.toLocaleString().split(', ')[0]))
    if (mail !== null) {
        if(muscleGroup.length !== 0) {
          const userExercisesRef = doc(db, "prev-groups", mail);
          setDoc(userExercisesRef, {...muscleGroup})
        }
      doneExercises.forEach(exercise => {
        const userExercisesRef = collection(db, "users", mail, `${exercise.type}`);
        addDoc(userExercisesRef, {date: date.toLocaleString().split(', ')[0], ...exercise})
      });
    }
  }, [doneExercises, mail]);
  React.useEffect(() => {
    setTimeout(() => {
      dispatch(clearStateExercises())
    }, 2000);
  },[])
 
  
    return(
        <div className="result__container">
        <div className="main__paragraph">Молодец, ты хорошо поработал!</div>
        <img className="result__logo" src="/img/logo.svg" alt="logo" />
        <Link to='/'><div className="button">Главная</div></Link>
        </div>
    )
}