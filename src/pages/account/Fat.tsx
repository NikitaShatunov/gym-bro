import React from "react"
export const Fat = () => {
    const [currentFat, setCurrentFat] = React.useState(15)
    const [initialFat, setInitialFat] = React.useState(22)
    const [goalFat, setGoalFat] = React.useState(10)
    React.useEffect(() => {
        
        
    },[])
  return (
    <>
    <div className="account__container">
      <div className="account__block">
        <div className="mainParagraph">Процент жира:</div>
       <div className="weight__container">
          <input className="fat__input" value={currentFat} onChange={(e) => setCurrentFat(+e.target.value)} type="number" />
       </div>
       <div className="weight__values">
        <div><div>Начальный:</div><input value={initialFat} onChange={(e) => setInitialFat(+e.target.value)} type="number" /></div>
        <div><div>Желаемый:</div><input value={goalFat} onChange={(e) => setGoalFat(+e.target.value)} type="number" /></div>
       </div>
       <img src="/img/account/fatDegree.svg" alt="degree" />
      </div>
    </div>
     <div className="footer"><div className="button__save">СОХРАНИТЬ</div></div>
     </>
  );
}