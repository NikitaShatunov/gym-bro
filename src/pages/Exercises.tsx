import { useAppSelector, useAppDispatch } from "../redux/redux";
import { v4 as uuidv4 } from "uuid";
import {removeChoosenGroup,setDoneGroup} from "../redux/slices/exerciseSlice";
import ExercisesSceleton from "../components/ExercisesSceleton";
import { ChooseEx } from "../components/ChooseEx";
import React from "react";
import { fetchData } from "../redux/slices/dataSlice";
import { resetItems } from "../redux/slices/dataSlice";
import { Link, useNavigate } from "react-router-dom";
export const Exercises = () => {
  const chosenGroup = useAppSelector((state) => state.exercise.choosenGroup);
  const doneGroup = useAppSelector((state) => state.exercise.doneGroup);
  const dispatch = useAppDispatch();
  const didMounted = React.useRef(false);
  const { data, error, loading } = useAppSelector((state) => state.data);
  const muscleGroup = useAppSelector((state) => state.exercise.muscleGroup);
  const exercises = useAppSelector((state) => state.exercise.chosedExercises);
  const filteredExecises = exercises.filter((obj) => obj.type === chosenGroup);
  const navigate = useNavigate()
  let arr: number[] = [];
  for (
    let i = 0;
    i < exercises.filter((obj) => obj.type === chosenGroup).length + 1;
    i++
  ) {
    arr.push(i);
  }
  React.useEffect(() => {
    dispatch(resetItems());
    if(muscleGroup.length === 0){
      navigate('/home')
    }

  }, []);
  React.useEffect(() => {
    if (!didMounted.current) {
      dispatch(fetchData(chosenGroup));
    }
    didMounted.current = true;
  }, [data, muscleGroup]);
  const onClickNext = () => {
    !doneGroup.includes(chosenGroup) &&
      chosenGroup &&
      dispatch(setDoneGroup(chosenGroup)) &&
      dispatch(removeChoosenGroup());
  };
  const onClickChoosenBlock = () => {};
  React.useEffect(() => {}, [chosenGroup]);
  return (
    <>
      {" "}
      {loading ? (
       <div className="sceleton__loader"><ExercisesSceleton /></div>
      ) : (
        <div className="container__ex__page">
          <div className="content">
            <div>
              <div className="main__paragraph">
                Выбери упражнения на{" "}
                {chosenGroup
                  ? chosenGroup.toLowerCase()
                  : doneGroup[doneGroup.length - 1]}
              </div>
              {arr.map((_, i) => (
                <div key={uuidv4()} className="df jcc">
                  <ChooseEx
                    excs={chosenGroup}
                    onClick={() => onClickChoosenBlock()}
                    props={filteredExecises[i]}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="footerWrapper">
            <Link to="/group">
              <button className="button__next">Назад</button>
            </Link>
            <Link to="/group">
              <button onClick={() => onClickNext()} className="button__next">
                Далее
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
