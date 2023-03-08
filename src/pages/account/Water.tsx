import React from "react"
export const Water = () => {
    const [goalWater, setGoalWater] = React.useState(3000)
    const [portionWater, setPortionlWater] = React.useState(0)
    const [sumWater, setSumWater] = React.useState(0)
    React.useEffect(() => {

    },[sumWater])
    const onClickClear = () => {
      setGoalWater(0)
      setPortionlWater(0)
      setSumWater(0)
    }
    return(
        <>
    <div className="account__container">
      <div className="account__block">
        <div className="mainParagraph">Счетчик воды:</div>
        <div className="h2paragraph">Нужно выпить мл: </div> 
        <div className="water__inputs__container"><input value={goalWater} onChange={(e) => setGoalWater(+e.target.value)} className="water__input" type="number" /><button className="water__button">OK</button></div> 
        <div className="h2paragraph">Выпил мл: </div> 
        <div className="water__inputs__container"><input value={portionWater} onChange={(e) => setPortionlWater(+e.target.value)} className="water__input" type="number" /><button onClick={() => setSumWater(sumWater + portionWater)} className="water__button">+</button></div> 
        <img className="bottle__water" src="/img/account/water.svg" alt="water" />
        <div className="h2paragraph">{sumWater} мл</div>
        <div onClick={() => onClickClear()} className="mainParagraph">Очистить</div>
      </div>
    </div>
     <div className="footer"><div className="button__save">СОХРАНИТЬ</div></div>
     </>
    )
}