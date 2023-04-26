import React from "react";
import { Cells } from "../components/Cells"
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { items } from "./HomePage";
import { setChoosenGroup, removeMuscleGroup, setMuscleGroup, removeChoosenGroup } from "../redux/slices/exerciseSlice";
import { Link, useNavigate } from "react-router-dom";
export const GroupChose = () => {
    const muscleGroup = useAppSelector((state) => state.exercise.muscleGroup);
    const choosenGroup = useAppSelector((state) => state.exercise.choosenGroup);
    const filteredItems = items.filter((item) =>
    muscleGroup.includes(Object.keys(item)[0])
  );
  const [isChoosed, setIsChoosed] = React.useState( muscleGroup.length > 1 ? true : false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const onClickCell = (name: string) => {
    navigate('/exercises')
    setIsChoosed(!isChoosed)
    dispatch(setChoosenGroup(name))
  };
  React.useEffect(() => {
    if(choosenGroup.length){
        dispatch(removeChoosenGroup())
    }
    if(muscleGroup.length == 0) {
      navigate('/home')
    }
  },[muscleGroup])
    return(
        <div className="group__container">
        <div className="main__paragraph">Выбери что будешь тренировать</div>
         {
          filteredItems.length > 1 ?  <div className="exercises__select_wrapper">
          {filteredItems.map((obj, key) => (
            <Cells
              key={key}
              name={Object.keys(obj)[0]}
              src={Object.values(obj)[0]}
              onClick={() => onClickCell(Object.keys(obj)[0])}
            />
          ))}
        </div> : 
         <div className="exercises__select_wrapper__one">
         {filteredItems.map((obj, key) => (
           <Cells
             key={key}
             name={Object.keys(obj)[0]}
             src={Object.values(obj)[0]}
             onClick={() => onClickCell(Object.keys(obj)[0])}
           />
         ))}
       </div>
         }
          <div className="footerWrapper">
        <Link to='/home'>
            <button className="button__next">На главную</button>
            </Link>
            <Link to='/result'>
            <button className="button__next">Закончить</button>
            </Link>
      </div>
        </div>
    )
}