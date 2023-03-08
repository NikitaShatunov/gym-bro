export const Pararms = () => {
    return(
        <>
        <div className="account__container">
          <div className="account__block">
            <div className="mainParagraph">Мои параметры:</div>
           <div className="params__container">
            <div className="params__cell"><div>Грудь:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>
            <div className="params__cell"><div>Шея:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>
            <div className="params__cell"><div>Запястье:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>
            <div className="params__cell"><div>Бицепс:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>
            <div className="params__cell"><div>Талия:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>
            <div className="params__cell"><div>Предплечья:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>
            <div className="params__cell"><div>Бёдра:</div><div><input type="number" /><img src="/img/account/graph.svg" alt="graph" /></div></div>

           </div>
          </div>
        </div>
         <div className="footer"><div className="button__save">СОХРАНИТЬ</div></div>
         </>
    )
}