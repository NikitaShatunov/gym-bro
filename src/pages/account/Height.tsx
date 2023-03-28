import { doc, getFirestore, setDoc } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from '../../fireBase'
import { useAppSelector } from '../../redux/redux'
import { fireBaseGetHeight } from '../../utils/fireBaseGetWeight'
export const Height = () => {
  const [height, setHeight] = React.useState(0)
  const [heightValue, setHeightValue] = React.useState(0)
  const [showError, setShowError] = React.useState(false)
  const mail = useAppSelector(state => state.user.mail)
  const navigate = useNavigate()
  React.useEffect(() => {
    if(mail != null){
    const prevWeightPromise = fireBaseGetHeight(mail);
    prevWeightPromise.then((data:any) => {
      if (data) {
        for (const key in data) {
          switch (key) {
            case "height":
              setHeight(data[key])
              break;
            default:
              break;
          }
        }
      }
    })
    }
      
  },[])
  React.useEffect(() => {
    
  },[height])
  const onClickSave = () => {
    if(height > 130 && height < 230){
      setShowError(false)
      setHeightValue(height)
      setTimeout(() => {
        navigate('/account')
      }, 100);
    }
    else {
      setShowError(true)
    }
  }
  React.useEffect(() => {
    const db = getFirestore(firebase);
    if (mail !== null && heightValue !== 0) {
      const userPropertiesRef = doc(db, "users-height", mail);
      setDoc(userPropertiesRef, { height })
        .then(() => console.log("Document successfully written!"))
        .catch((error) => console.error("Error writing document: ", error))
    }
  },[heightValue])
    return(
      <>
      <div className="account__container">
        <div className="account__block">
          <div className="mainParagraph">Мой рост:</div>
          <input value={height} onChange={(e) => setHeight(+e.target.value)} className="input__height" type="number" />
          
          <br />
          <img className="heightSVG" src="/img/account/height.svg" alt="height" />
          {showError && <p style={{color: 'red'}}>Укажите реальный рост.</p>}
        </div>
      </div>
       <div className="footer"><div onClick={() => onClickSave()} className="button__save">СОХРАНИТЬ</div></div>
       </>
    )
}