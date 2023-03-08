import React from "react"
export const Weight = () => {
    const [currentWeight, setCurrentWeight] = React.useState(72.0)
    const [initialWeight, setInitialWeight] = React.useState(70.0)
    const [goalWeight, setGoalWeight] = React.useState(74.0)
    React.useEffect(() => {
        
        
    },[])
  return (
    <>
    <div className="account__container">
      <div className="account__block">
        <div className="mainParagraph">Текущий вес:</div>
       <div className="weight__container">
       <div className="weight__wrapper">
          <img onClick={() => setCurrentWeight(+(currentWeight - 0.1).toFixed(1))} src="/img/account/minus.svg" alt="minus" />
          <input value={currentWeight} onChange={(e) => setCurrentWeight(+e.target.value)} type="number" />
          <img onClick={() => setCurrentWeight(+(currentWeight + 0.1).toFixed(1))} src="/img/account/plus.svg" alt="plus" />
        </div>
       </div>
       <div className="weight__values">
        <div><div>Начальный вес:</div><input value={initialWeight} onChange={(e) => setInitialWeight(+e.target.value)} type="number" /></div>
        <div><div>Желаемый вес:</div><input value={goalWeight} onChange={(e) => setGoalWeight(+e.target.value)} type="number" /></div>
       </div>
      </div>
    </div>
     <div className="footer"><div className="button__save">СОХРАНИТЬ</div></div>
     </>
  );
};
