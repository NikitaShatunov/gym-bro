import React from "react";
import firebase, { firebaseConfig } from "../fireBase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
export const SignUp = () => {
  const authErrorsCode: any = {
    'invalid-email': '*Почта указана не верно.',
    'wrong-password': '*Неверный пароль.',
    'weak-password': '*Слабый пароль.',
    'internal-error': '*Заполните поля.',
    'user-not-found': '*Пользователь не найден.'
  }
  const [authStatus, setAuthStatus] = React.useState('')
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
        navigate('/home')
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthStatus(errorMessage.split('/')[1].split(').')[0]);
      });
  };
  React.useEffect(() => {
    if(mail !== null){
      navigate('/home')
    }
    
  },[mail, authStatus])
  const handleClickRegistration = (email: string, password: string) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user.email));
        navigate('/home')
      })
      .catch((error) => {     
        const errorMessage = error.message;
        setAuthStatus(errorMessage.split('/')[1].split(').')[0])
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
            {Boolean(authStatus) && <p style={{color: 'red', textAlign: 'left'}}>{authErrorsCode[authStatus]}</p>}
            <div className="button-wrapper">
              <div className="button" onClick={() => {handleClickRegistration(email, password)}}>РЕГИСТРАЦИЯ</div>
            </div>
            <div onClick={() => {setIsReg(false); setEmail(''); setPassword(''); setAuthStatus('')}} className="sideFunc">
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
            {Boolean(authStatus) && <p style={{color: 'red', textAlign: 'left'}}>{authErrorsCode[authStatus]}</p>}
            <div className="button-wrapper">
              <div className="button" onClick={() => handleClickSignUp(email, password)}>ВОЙТИ</div>
            </div>
            <div onClick={() => {setIsReg(true); setEmail(''); setPassword(''); setAuthStatus('') }} className="sideFunc">
              ИЛИ ЗАРЕГЕСТРИРУЙСЯ
            </div>
          </>
        )}
      </div>
    </div>
  );
};
