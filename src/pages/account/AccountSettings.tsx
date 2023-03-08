import React from "react";
export const AccountSettings = () => {
    const [sex, setSex] = React.useState(1);
    const [name, setName] = React.useState("Никита");
    const [age, setAge] = React.useState(18);
    return(
       <div>
         <div className="account__container">
            <div className="account__block">
                <div className="mainParagraph">Настройки профиля:</div>
                <div className="wrapper">
                <div className="settings__wrapper">
                   <div>
                   <div className="settings"><div>Имя:</div><input onChange={(e) => setName(e.target.value)} type="text" /></div>
                    <div className="settings"><div>Возраст:</div><input onChange={(e) => setAge(+e.target.value)} type="number" /></div>
                    <div className="settings"><div>Пол:</div><div className="buttons"><button onClick={() => setSex(1)}>МУЖ</button><button onClick={() => setSex(0)}>ЖЕН</button></div></div>
                   </div>
                </div>
                </div>
                <img
          className="avatar"
          src={sex ? "/img/account/logoMan.svg" : "/img/account/logoWoman.svg"}
          alt="logo"
        />
        <div className="name">
          {name}, {age}
        </div>
            </div>
        </div>
        <div className="footer"><div className="button__save">СОХРАНИТЬ</div></div>
       </div>
    )
}