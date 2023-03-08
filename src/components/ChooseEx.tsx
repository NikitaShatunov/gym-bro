import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import {
  chosedExercises,
  clearDoneExercises,
  removeChoosedExecises,
  removeDoneExercises,
  setChoosedExecises,
  setDoneExercises,
} from "../redux/slices/exerciseSlice";
interface ChooseExIn {
  excs: string | "";
  onClick?: () => void;
  props: chosedExercises;
}
export const ChooseEx = ({ excs, onClick, props }: ChooseExIn) => {
  const [isBlockOpen, setIsBlockOpen] = React.useState(false);
  const data = useAppSelector((state) => state.data.data);
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const filtered = data.filter((obj) => obj[0].muscle_group === excs);
  const exsArray = filtered.map((key) => key[0].exercises);
  const [search, setSearch] = React.useState('')
  const [id, setId] = React.useState(0);
  const doneExercises = useAppSelector((state) => state.exercise.doneExercises);
  const doneExercisesArray = doneExercises.filter(
    (obj) => obj.name === (props ? props.name : "")
  );
  const isOpenEdited = props ? true : false;
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  const toggleBlock = () => {
    setIsBlockOpen(!isBlockOpen);
  };
  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(ref.current as Node);
      if (!path) {
        setIsBlockOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [data]);
  const onClickExs = (name: string) => {
    dispatch(setChoosedExecises({ name, type: excs, weight }));
  };
  const onClickAdd = (name: string) => {
    setId(id + 1);
    dispatch(setDoneExercises({ name, type: excs, weight, reps, id }));
  };
  const onClickRemove = (obj: chosedExercises, i: number) => {
    dispatch(removeDoneExercises({ ...obj, i }));
  };
  const onClickDelete = () => {
    if(window.confirm(`Вы уверены что хотите удалить ${props.name}`)){
      dispatch(removeChoosedExecises(props.name))
      dispatch(clearDoneExercises(props.name))
    }
  }
  const onChangeSearch = (value: string) => {
    setSearch(value)
  }


  return (
    <>
      {isBlockOpen ? (
        <div
          className={"exercise__block__closed exercise__block__open"}
          ref={ref}
        >
          {isOpenEdited ? (
            <div>
              <div
                className="exercise__block__open__edit__header"
              >
                <div>{props.name}</div>
                <svg  onClick={() => onClickDelete()}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.75 5.5H4.58334H19.25"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.3335 5.50002V3.66668C7.3335 3.18045 7.52665 2.71414 7.87046 2.37032C8.21428 2.0265 8.6806 1.83334 9.16682 1.83334H12.8335C13.3198 1.83334 13.7861 2.0265 14.1298 2.37032C14.4737 2.71414 14.6668 3.18045 14.6668 3.66668V5.50002M17.4168 5.50002V18.3334C17.4168 18.8196 17.2237 19.2859 16.8798 19.6297C16.5361 19.9735 16.0698 20.1666 15.5835 20.1666H6.41682C5.9306 20.1666 5.46428 19.9735 5.12046 19.6297C4.77665 19.2859 4.5835 18.8196 4.5835 18.3334V5.50002H17.4168Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.1665 10.0833V15.5834"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.8335 10.0833V15.5834"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="tool__bar">
                <div>Вес</div>
                <input
                  defaultValue={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  type="number"
                />
                <div>Повторения</div>
                <input
                  defaultValue={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  type="number"
                />
                <img
                  onClick={() => onClickAdd(props.name)}
                  src="/img/add.svg"
                  alt="add"
                />
              </div>
              <div className="line"></div>
              <div>
                <ul className="list__edit">
                  {doneExercisesArray.map((obj, i) => (
                    <li key={i}>
                      {i + 1}. {obj.weight} кг - {obj.reps} повторений{" "}
                      <img
                        onClick={() => onClickRemove(obj, i)}
                        src="/img/remove.svg"
                        alt="remove"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className="searching">
                <svg
                  className="searching__icon"
                  height="48"
                  viewBox="0 0 48 48"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
                  <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
                <input
                  placeholder="Поиск..."
                  className="exercise__block__open__input"
                  onChange={(e) => onChangeSearch(e.target.value)}
                />
              </div>
              <div className="exs__list__wrapper">
                <ul className="exs__list__container">
                  {exsArray[0].filter(obj => obj.toLowerCase().includes(search.toLowerCase())).map((obj) => (
                    <li
                      onClick={() => onClickExs(obj)}
                      className="exs__list__container__items"
                      key={uuidv4()}
                    >
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          ref={ref}
          className={`exercise__block__closed ${
            isBlockOpen ? "exercise__block__open" : ""
          }`}
          onClick={toggleBlock}
        >
          <div>{props ? props.name : "Добавить упражнение"}</div>
          <img
            className="svg__closed__block"
            src={props ? "/img/polygon.svg" : "/img/plus.svg"}
            alt="plus"
          />
        </div>
      )}
    </>
  );
};
