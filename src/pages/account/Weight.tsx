import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../fireBase";
import { useAppSelector } from "../../redux/redux";
import { fireBaseGetWeight } from "../../utils/fireBaseGetWeight";
import { ChartComponent } from "../../components/ChartComponent";

export const Weight = () => {
  const [currentWeight, setCurrentWeight] = React.useState(0);
  const [initialWeight, setInitialWeight] = React.useState(0);
  const [goalWeight, setGoalWeight] = React.useState(0);
  const [goalWeightValue, setGoalWeightValue] = React.useState(0);
  const [prevArray, setPrevWeightArray] = React.useState<any>([]);
  const [isPopUpShown, setIsPopUpShown] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const mail = useAppSelector((state) => state.user.mail);
  const date = useAppSelector((state) => state.dateSlice.date);

  const navigate = useNavigate();
  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(ref.current as Node);
      if (!path) {
        setIsPopUpShown(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, []);
  React.useEffect(() => {
    if (mail !== null) {
      const prevWeightPromise = fireBaseGetWeight(mail);
      prevWeightPromise.then((data: any) => {
        if (data) {
          for (const key in data) {
            switch (key) {
              case "currentWeight":
                setCurrentWeight(data[key]);
                break;
              case "goalWeight":
                setGoalWeight(data[key]);
                break;
              case "prevArray":
                setPrevWeightArray(data[key]);
                break;
              default:
                break;
            }
          }
        }
      });
    }
  }, []);
  React.useEffect(() => {}, [initialWeight]);
  const onClickGoalWeight = () => {
    setIsPopUpShown(true);
  };
  const onClickSave = () => {
    setGoalWeightValue(goalWeight);
    if (currentWeight !== 0) {
      if (prevArray.length !== 0) {
        if (
          currentWeight !== Object.values(prevArray[prevArray.length - 1])[0]
        ) {
          const newWeight: any = { [date]: currentWeight };
          setPrevWeightArray((prevArray: any) => [...prevArray, newWeight]);
        }
      } else {
        const newWeight: any = { [date]: currentWeight };
        setPrevWeightArray([newWeight]);
      }
      if (goalWeight && currentWeight) {
        setTimeout(() => {
          navigate("/account");
        }, 100);
      }
    }
  };

  React.useEffect(() => {
    const db = getFirestore(firebase);
    if (mail !== null && currentWeight !== 0 && goalWeight !== 0) {
      const userPropertiesRef = doc(db, "users-weight", mail);
      setDoc(userPropertiesRef, {
        prevArray: [...prevArray],
        currentWeight,
        goalWeight,
      })
        .then(() => console.log("Document successfully written!"))
        .catch((error) => console.error("Error writing document: ", error));

      if (prevArray.length !== 0) {
        const initial: any = Object.values(prevArray[0])[0];
        setInitialWeight(initial);
      }
    }
    
  }, [prevArray, goalWeightValue]);
  return (
    <>
      <div className="account__container">
        <div className="account__block">
          <div className="mainParagraph">Текущий вес:</div>
          <div className="weight__container">
            <div className="weight__wrapper">
              <img
                onClick={() =>
                  setCurrentWeight(+(currentWeight - 0.1).toFixed(1))
                }
                src="/img/account/minus.svg"
                alt="minus"
              />
              <input
                placeholder={String(currentWeight)}
                onChange={(e) => setCurrentWeight(+e.target.value)}
                type="number"
              />
              <img
                onClick={() =>
                  setCurrentWeight(+(currentWeight + 0.1).toFixed(1))
                }
                src="/img/account/plus.svg"
                alt="plus"
              />
            </div>
          </div>
          <div className="weight__values">
            <div>
              <div>Начальный вес:</div>
              <div className="weight-cells">{initialWeight}</div>
            </div>
            <div ref={ref}>
              <div>Желаемый вес:</div>
              <div onClick={() => onClickGoalWeight()} className="weight-cells">
                {goalWeight}
              </div>{" "}
              {
                <div className={isPopUpShown ? "pop-up-weight" : "pop_up_hide"}>
                  <input
                    placeholder={`${goalWeight}`}
                    onChange={(e) => setGoalWeight(+e.target.value)}
                    type="number"
                  />
                </div>
              }
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <ChartComponent
              propsValue={prevArray.slice(prevArray.length - 6).map(
                (obj: { [key: string]: any }): any => Object.values(obj)[0]
              )}
              propsLabels={prevArray.slice(prevArray.length - 6).map((obj: { [key: string]: any }): any =>
                Object.keys(obj)[0].split(".").splice(0, 2).join(".")
              )}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="button__save" onClick={() => onClickSave()}>
          СОХРАНИТЬ
        </div>
      </div>
    </>
  );
};
