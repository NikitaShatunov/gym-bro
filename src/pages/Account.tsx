import React from "react";
import { Link } from "react-router-dom";
export const Account = () => {
  const [sex, setSex] = React.useState(1);
  const [name, setName] = React.useState("Никита");
  const [age, setAge] = React.useState(18);
  const options = [['weight', "Мой вес"], ['height', "Мой рост"], ['params', "Мой параметры"], ['fat', "Процент жира"], ['water', "Счетчик воды"],]
  return (
    <div className="account__container">
      <div className="account__block">
       <Link to='/settings'> <img
          className="settings__svg"
          src="img/account/settings.svg"
          alt="settings"
        /></Link>
        <img
          className="avatar"
          src={sex ? "/img/account/logoMan.svg" : "/img/account/logoWoman.svg"}
          alt="logo"
        />
        <div className="name">
          {name}, {age}
        </div>
        <div className="options__container">
            <div>
         {
            options.map((obj, i )=> <Link className="link" to={`/${obj[0]}`} key={i}>
            <div>
             <div className="options">
            <div className="left">
              <img src={`/img/account/${obj[0]}.svg`} alt="weight" />
              {obj[1]}
            </div>
            <img className="polygon" src="/img/polygon.svg" alt="polygon" />
          </div>
            </div>
            </Link>)
         }
         </div>
        </div>
      </div>
    </div>
  );
};
