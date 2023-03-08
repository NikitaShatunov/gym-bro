import React from "react"
export const SignUp = () => {
    const [isReg, setIsReg] = React.useState(false)
    return(
        <div className="wrapper__signup">
            <div className="signup__container">
           {
            isReg ? <div><img src="/img/logo.svg"  alt="logo"/>
            <div className="pharagraph">ЗАРЕГЕСТРИРУЙСЯ</div>
            <input placeholder="email" type="text" />
            <br />
            <input placeholder="password" type="password" />
            <div className="button-wrapper"><div className="button">РЕГИСТРАЦИЯ</div></div>
            <div onClick={() => setIsReg(false)} className="sideFunc">ВХОД</div></div> : <> <img src="/img/logo.svg"  alt="logo"/>
            <div className="pharagraph">ВВЕДИ ПОЧТУ И ПАРОЛЬ</div>
            <input placeholder="email" type="text" />
            <br />
            <input placeholder="password" type="password" />
            <div className="button-wrapper"><div className="button">ВОЙТИ</div></div>
            <div onClick={() => setIsReg(true)} className="sideFunc">ИЛИ ЗАРЕГЕСТРИРУЙСЯ</div></>
           }
        </div>
        </div>
    )
}