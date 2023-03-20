import React from "react";
import firebase, { firebaseConfig } from "../fireBase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { setUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
export const SignUp = () => {
  const [isReg, setIsReg] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate()
  const mail = useAppSelector(state => state.user.mail)
  const dispatch = useAppDispatch();
  const handleClickSignUp = (email: string, password: string) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user.email));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  React.useEffect(() => {
    if(mail !== null){
      navigate('/home')
    }
  },[mail])
  const handleClickRegistration = (email: string, password: string) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user.email));
      })
      .catch((error) => {
        const errorCode = error.code;      
        const errorMessage = error.message;
        alert(errorMessage)
      });
  };
  return (
    <div className="wrapper__signup">
      <div className="signup__container">
        {isReg ? (
          <div>
            <img src="/img/logo.svg" alt="logo" />
            <div className="pharagraph">ЗАРЕГЕСТРИРУЙСЯ</div>
            <input placeholder="email" type="text"  onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <div className="button-wrapper">
              <Link to='/home'><div className="button" onClick={() => {handleClickRegistration(email, password)}}>РЕГИСТРАЦИЯ</div></Link>
            </div>
            <div onClick={() => {setIsReg(false); setEmail(''); setPassword('')}} className="sideFunc">
              ВХОД
            </div>
          </div>
        ) : (
          <>
            {" "}
            <img src="/img/logo.svg" alt="logo" />
            <div className="pharagraph">ВВЕДИ ПОЧТУ И ПАРОЛЬ</div>
            <input placeholder="email" type="text" onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <div className="button-wrapper">
              <Link to='/home'><div className="button" onClick={() => handleClickSignUp(email, password)}>ВОЙТИ</div></Link>
            </div>
            <div onClick={() => {setIsReg(true); setEmail(''); setPassword('')}} className="sideFunc">
              ИЛИ ЗАРЕГЕСТРИРУЙСЯ
            </div>
          </>
        )}
      </div>
    </div>
  );
};
