import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../fireBase";
import { useAppSelector } from "../../redux/redux";
import { fireBaseGetParams } from "../../utils/fireBaseGetWeight";
export const Pararms = () => {
  const [chest, setChest] = React.useState(0);
  const [neck, setNeck] = React.useState(0);
  const [wrist, setWrist] = React.useState(0);
  const [biceps, setBiceps] = React.useState(0);
  const [waist, setWaist] = React.useState(0);
  const [hips, setHips] = React.useState(0);
  const [forearms, setForearms] = React.useState(0);
  const [showError, setShowError] = React.useState(false);
  const navigate = useNavigate()
  const mail = useAppSelector((state) => state.user.mail);
  const onClickSave = () => {
    if (chest && neck && wrist && biceps && waist && hips && forearms) {
      setShowError(false);
      const db = getFirestore(firebase);
      if (mail !== null) {
        const userPropertiesRef = doc(db, "users-params", mail);
        setDoc(userPropertiesRef, {
          chest,
          neck,
          wrist,
          biceps,
          waist,
          hips,
          forearms,
        })
          .then(() => console.log("Document successfully written!"))
          .catch((error) => console.error("Error writing document: ", error));
      }
      navigate('/account')
    } else {
      setShowError(true);
    }
  };
  React.useEffect(() => {
    if (mail !== null) {
      const data = fireBaseGetParams(mail);
      data.then((data: any) => {
        if (data) {
          for (const key in data) {
            switch (key) {
              case "chest":
                setChest(data[key]);
                break;
              case "neck":
                setNeck(data[key]);
                break;
              case "wrist":
                setWrist(data[key]);
                break;
                case "biceps":
                  setBiceps(data[key]);
                  break;
                case "waist":
                  setWaist(data[key]);
                  break;
                case "hips":
                  setHips(data[key]);
                  break;
                  case "forearms":
                  setForearms(data[key]);
                  break;
              default:
                break;
            }
          }
        }
      });
    }
  }, []);
  return (
    <>
      <div className="account__container">
        <div className="account__block">
          <div className="mainParagraph">Мои параметры:</div>
          <div className="params__container">
            <div className="params__cell">
              <div>Грудь:</div>
              <div>
                <input
               placeholder={String(chest)}
                  onChange={(e) => setChest(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            <div className="params__cell">
              <div>Шея:</div>
              <div>
                <input
               placeholder={String(neck)}
                  onChange={(e) => setNeck(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            <div className="params__cell">
              <div>Запястье:</div>
              <div>
                <input
               placeholder={String(wrist)}
                  onChange={(e) => setWrist(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            <div className="params__cell">
              <div>Бицепс:</div>
              <div>
                <input
               placeholder={String(biceps)}
                  onChange={(e) => setBiceps(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            <div className="params__cell">
              <div>Талия:</div>
              <div>
                <input
               placeholder={String(waist)}
                  onChange={(e) => setWaist(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            <div className="params__cell">
              <div>Предплечья:</div>
              <div>
                <input
               placeholder={String(forearms)}
                  onChange={(e) => setForearms(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            <div className="params__cell">
              <div>Бёдра:</div>
              <div>
                <input
               placeholder={String(hips)}
                  onChange={(e) => setHips(+e.target.value)}
                  type="number"
                />
                <img src="/img/account/graph.svg" alt="graph" />
              </div>
            </div>
            {showError && <p style={{ color: "red" }}>*Заполните все поля!</p>}
          </div>
        </div>
      </div>
      <div className="footer">
        <div onClick={() => onClickSave()} className="button__save">
          СОХРАНИТЬ
        </div>
      </div>
    </>
  );
};
