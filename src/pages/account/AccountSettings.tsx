import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../fireBase";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import { setAge, setGender, setName } from "../../redux/slices/userSlice";
export const AccountSettings = () => {
  const gender = useAppSelector(state => state.user.gender)
  const name = useAppSelector(state => state.user.name)
  const age = useAppSelector(state => state.user.age)
  const [genderState, setGenderState] = React.useState(gender);
  const [nameState, setNameState] = React.useState(name);
  const [ageState, setAgeState] = React.useState(age);
  const dispatch = useAppDispatch();
  const mail = useAppSelector((state) => state.user.mail);

  const onClickSave = () => {
    dispatch(setName(name));
    dispatch(setAge(age));
    dispatch(setGender(gender));
    const db = getFirestore(firebase);
    if (mail !== null && name !== null && age !== null && gender !== null) {
      const userPropertiesRef = doc(db, "users-props", mail);
      setDoc(userPropertiesRef, { name: nameState, age: ageState, gender: genderState })
     
  };
}
  return (
    <div>
      <div className="account__container">
        <div className="account__block">
          <div className="mainParagraph">Настройки профиля:</div>
          <div className="wrapper">
            <div className="settings__wrapper">
              <div>
                <div className="settings">
                  <div>Имя:</div>
                  <input
                    onChange={(e) => setNameState(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="settings">
                  <div>Возраст:</div>
                  <input
                    onChange={(e) => setAgeState(+e.target.value)}
                    type="number"
                  />
                </div>
                <div className="settings">
                  <div>Пол:</div>
                  <div className="buttons">
                    <button style={genderState ? {backgroundColor: 'lightgrey'} : {}} onClick={() => setGenderState(1)}>МУЖ</button>
                    <button style={!genderState ? {backgroundColor: 'lightgrey'} : {}} onClick={() => setGenderState(0)}>ЖЕН</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="avatar"
            src={
              genderState ? "/img/account/logoMan.svg" : "/img/account/logoWoman.svg"
            }
            alt="logo"
          />
          <div className="name">
            {nameState}, {ageState}
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to='/account'><div className="button__save" onClick={onClickSave}>СОХРАНИТЬ</div></Link>
      </div>
    </div>
  );
};
