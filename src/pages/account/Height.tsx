export const Height = () => {
    return(
      <>
      <div className="account__container">
        <div className="account__block">
          <div className="mainParagraph">Мой рост:</div>
          <input className="input__height" type="number" />
          <br />
          <img className="heightSVG" src="/img/account/height.svg" alt="height" />
        </div>
      </div>
       <div className="footer"><div className="button__save">СОХРАНИТЬ</div></div>
       </>
    )
}