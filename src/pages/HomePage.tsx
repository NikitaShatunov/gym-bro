import { Cells } from "../components/Cells";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import {
  clearMuscleGroup,
  clearStateExercises,
  removeMuscleGroup,
  setMuscleGroup,
} from "../redux/slices/exerciseSlice";

import React from "react";

import { fireBaseGetUser } from "../utils/fireBaseGetUser";
import { setAge, setGender, setName } from "../redux/slices/userSlice";
import { clearWaterState } from "../redux/slices/sideSlice";

export const items = [
  { Грудь: "/img/chest.svg" },
  { Бицепс: "img/biceps.svg" },
  { Спина: "/img/back.svg" },
  { Трицепс: "/img/triceps.svg" },
  { Ноги: "/img/legs.svg" },
  { Плечи: "/img/shoulders.svg" },
];
export const HomePage: React.FC = () => {
  const dateValue = useAppSelector((state) => state.dateSlice.date);
  const date = new Date();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const muscleGroup = useAppSelector((state) => state.exercise.muscleGroup);
  const email = useAppSelector((state) => state.user.mail);

  const onClickCell = (name: string) => {
    if (muscleGroup.includes(name)) {
      dispatch(removeMuscleGroup(name));
    } else {
      dispatch(setMuscleGroup(name));
    }
  };
  React.useEffect(() => {
    dispatch(clearMuscleGroup());
  }, []);
  React.useEffect(() => {
    if (email === null) {
      navigate("/");
    }
    if (dateValue !== date.toLocaleString().split(", ")[0]) {
      dispatch(clearStateExercises());
      dispatch(clearWaterState());
    }
  }, [email]);

  React.useEffect(() => {
    if (email) {
      const data = fireBaseGetUser(email);
      data.then((res) => {
        for (const key in res) {
          switch (key) {
            case "age":
              dispatch(setAge(res[key]));
              break;
            case "gender":
              dispatch(setGender(res[key]));
              break;
            case "name":
              dispatch(setName(res[key]));
              break;
            default:
              break;
          }
        }
      });
    }
    dispatch(clearStateExercises());
  }, [email]);

  const itemsPrev = [{ Грудь: "/img/chest.svg" }, { Бицепс: "img/biceps.svg" }];
  return (
    <div className="main">
      <div className="main__paragraph">Выбери что будешь тренировать</div>
      <div className="main__cells">
        {items.map((obj, key) => (
          <Cells
            key={key}
            name={Object.keys(obj)[0]}
            src={Object.values(obj)[0]}
            onClick={() => onClickCell(Object.keys(obj)[0])}
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
          {!!muscleGroup.length ? (
            <button className="button__next">Далее</button>
          ) : (
            <button
              disabled={true}
              className="button__next button__next__disabled"
            >
              Далее
            </button>
          )}
        </Link>
      </div>
    </div>
  );
};
