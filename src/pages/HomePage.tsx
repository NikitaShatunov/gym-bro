import { Cells } from "../components/Cells";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { clearMuscleGroup, removeMuscleGroup, setMuscleGroup } from "../redux/slices/exerciseSlice";
import React from "react"
export const items = [
  { Грудь: "/img/chest.svg" },
  { Бицепс: "img/biceps.svg" },
  { Спина: "/img/back.svg" },
  { Трицепс: "/img/triceps.svg" },
  { Ноги: "/img/legs.svg" },
  { Плечи: "/img/shoulders.svg" },
];
export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const muscleGroup = useAppSelector(state => state.exercise.muscleGroup);
  const onClickCell = (name: string) => {
    if(muscleGroup.includes(name)){
        dispatch(removeMuscleGroup(name))
    }
    else {
        dispatch(setMuscleGroup(name))
    }
  };
  React.useEffect(() => {
    dispatch(clearMuscleGroup())
  },[])
 
  const itemsPrev = [{ Грудь: "/img/chest.svg" }, { Бицепс: "img/biceps.svg" }, ];
  return (
    <div className="main">
      <div className="main__paragraph">Выбери что будешь тренировать</div>
      <div className="main__cells">
        {items.map((obj, key) => (
          <Cells
            key={key}
            name={Object.keys(obj)[0]}
            src={Object.values(obj)[0]}
            onClick = {() => onClickCell(Object.keys(obj)[0])}
          />
        ))}
      </div>
      <div className="second__paragraph">На прошлой тренировке были:</div>
      <div className="main__cells">
        {itemsPrev.map((obj, key) => (
          <Cells
            key={key}
            name={Object.keys(obj)[0]}
            src={Object.values(obj)[0]}
          />
        ))}
      </div>
      <div className="footer">
        <Link to="/group">
            {!!muscleGroup.length ? <button className="button__next">Далее</button> : <button disabled={true} className="button__next button__next__disabled">Далее</button>}
          
        </Link>
      </div>
    </div>
  );
};
