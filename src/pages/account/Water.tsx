import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/redux"
import { clearWaterState, setDrunk, setGoal } from "../../redux/slices/sideSlice"
export const Water = () => {
  const goal = useAppSelector((state) => state.side.goal)
  const drunk = useAppSelector((state) => state.side.drunk)
  const [portionWater, setPortionlWater] = React.useState(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const email = useAppSelector(state => state.user.mail)
  React.useEffect(() => {
    if(!email){
      navigate('/')
    }
  }, [goal, drunk])
  const onClickClear = () => {
    dispatch(clearWaterState())
    setPortionlWater(0)
  }
 
  return ( 
    <>
      <div className="account__container">
        <div className="account__block">
          <div className="mainParagraph">Счетчик воды:</div>
          <div className="h2paragraph">Нужно выпить мл: </div>
          <div className="water__inputs__container">
            <input
            placeholder={String(goal)}
              onChange={(e) => (dispatch(setGoal(+e.target.value)))}
              className="water__input"
             
            />
          </div>
          <div className="h2paragraph">Выпил мл: </div>
          <div className="water__inputs__container">
            <input
            placeholder={String(portionWater)}
              onChange={(e) => setPortionlWater(Number(e.target.value))}
              className="water__input"
              type="number"
            />
            <button
              onClick={() => dispatch(setDrunk(portionWater))}
              className="water__button"
            >
              +
            </button>
          </div>
          <div>
          <img
            className="bottle__water"
            src="/img/account/water.svg"
            alt="water"
          />
          <div className="water__layer" style={drunk ? {height: `${(90 * (drunk / goal)).toFixed(0)}px`} : {height: '0px'}}>

          </div>
          </div>
          <div className="h2paragraph" >{drunk} мл</div>
          <div onClick={() => onClickClear()} className="clear__button">
            Очистить
          </div>
        </div>
      </div>
      <div className="footer">
       <Link to='/account'> <div className="button__save">СОХРАНИТЬ</div></Link>
      </div>
    </>
  );
};
