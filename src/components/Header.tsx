import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/redux";
import React from "react";
export const Header: React.FC = () => {
  const date = new Date();
  const dateValue = useAppSelector((state) => state.dateSlice.date);
  const location = useLocation();
  const navigate = useNavigate();
  const onClickHome = () => {
    if (location.pathname == "/exercises") {
      if (
        window.confirm(
          "Вы уверены что хотите покинуть страницу? Все несохраненные данные будут удалены."
        )
      ) {
        navigate("/home");
      }
    } else {
      navigate("/home");
    }
  };
  const onClickAccount = () => {
    if (location.pathname == "/exercises") {
      if (
        window.confirm(
          "Вы уверены что хотите покинуть страницу? Все несохраненные данные будут удалены."
        )
      ) {
        navigate("/account");
      }
    } else {
      navigate("/account");
    }
  };
  React.useEffect(() => {
    if (dateValue !== date.toLocaleString().split(", ")[0]) {
      navigate("/");
    }
    if (
      +dateValue.split(".")[0] - 5 <
        +date.toLocaleString().split(", ")[0].split(".")[0] ||
      +dateValue.split(".")[1] !==
        +date.toLocaleString().split(", ")[0].split(".")[1]
    ) {
        console.log('go');
    }
  }, []);
  return (
    <div className="header">
      <img onClick={() => onClickHome()} src="/img/logo.svg" alt="logo" />
      <img
        onClick={() => onClickAccount()}
        src="/img/account.svg"
        alt="account"
      />
    </div>
  );
};
