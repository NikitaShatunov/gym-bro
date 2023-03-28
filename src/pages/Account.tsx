import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { clearStateExercises } from '../redux/slices/exerciseSlice';
import { clearWaterState } from "../redux/slices/sideSlice";
import { setAge, setGender, setName, removeUser } from "../redux/slices/userSlice";
import { fireBaseGetUser } from "../utils/fireBaseGetUser";
export const Account = () => {
  const gender = useAppSelector((state) => state.user.gender);
  const name = useAppSelector((state) => state.user.name);
  const age = useAppSelector((state) => state.user.age);
  const email = useAppSelector((state) => state.user.mail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const date = new Date();
  const dateValue = useAppSelector(state => state.dateSlice.date) 
  const options = [
    ["weight", "Мой вес"],
    ["height", "Мой рост"],
    ["params", "Мои параметры"],
    // ["fat", "Процент жира"],
    ["water", "Счетчик воды"],
  ];
  React.useEffect(() => {
    if(dateValue !== (date.toLocaleString().split(', ')[0])){
      navigate('/')
    }
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
  }, [name, gender, name]);
const onClickExit = () => {
  if(window.confirm("Вы хотите выйти?")){
    dispatch(removeUser())
    dispatch(clearStateExercises())
    dispatch(clearWaterState())
    navigate('/home')
  }
}
  return (
    <div className="account__container">
      <div className="account__block">
        <img className="exit__svg" onClick={() => onClickExit()} src="/img/exit.svg" alt="exit" />
        <Link to="/settings">
          {" "}
          <img
            className="settings__svg"
            src="img/account/settings.svg"
            alt="settings"
          />
        </Link>
        <img
          className="avatar"
          src={
            gender ? "/img/account/logoMan.svg" : "/img/account/logoWoman.svg"
          }
          alt="logo"
        />
        <div className="name">{name ? `${name}, ${age}` : "Пользователь"}</div>
        <div className="options__container">
          <div>
            {options.map((obj, i) => (
              <Link className="link" to={`/${obj[0]}`} key={i}>
                <div>
                  <div className="options">
                    <div className="left">
                      <img src={`/img/account/${obj[0]}.svg`} alt="weight" />
                      {obj[1]}
                    </div>
                    <img
                      className="polygon"
                      src="/img/polygon.svg"
                      alt="polygon"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
