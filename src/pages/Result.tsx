import React from "react"
import { useAppSelector } from "../redux/redux"
import { chosedExercises } from "../redux/slices/exerciseSlice"

interface Exercise {
    name: string;
    type: string;
    weight: number;
    reps: number;
  }
  
export const Result = () => {
    const doneExercises = useAppSelector(state => state.exercise.doneExercises)
    const doneGroup = useAppSelector(state => state.exercise.doneGroup)
    
    const groupedByType: Record<string, Exercise[]> = doneExercises.reduce((acc: any, curr) => {
        if (!acc[curr.type]) {
          acc[curr.type] = [];
        }
        acc[curr.type].push(curr);
        return acc;
      }, {});
      
      const groupedByTypeAndName: Record<string, Record<string, Exercise[]>> = Object.entries(groupedByType).reduce((acc: any, [type, exercises]) => {
        const exercisesByName = exercises.reduce((exerciseAcc, exercise) => {
          if (!exerciseAcc[exercise.name]) {
            exerciseAcc[exercise.name] = [];
          }
          exerciseAcc[exercise.name].push(exercise);
          return exerciseAcc;
        }, {} as Record<string, Exercise[]>);
        acc[type] = exercisesByName;
        return acc;
      }, {});
      let arr = []
      let arr2: any = []
    for (const key in groupedByTypeAndName) {
        arr.push(groupedByTypeAndName[key]);
    }
    arr.map(obj => {
        for (const key in obj) {
            arr2.push(obj[key]);
            
        }
    })
    console.log(arr2);
    
    return(
        <>
        <div className="main__paragraph">Сегодня Вы сделали:</div>
        </>
    )
}