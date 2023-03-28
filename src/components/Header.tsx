import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom"

export const Header: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const onClickHome = () => {
        if(location.pathname =='/exercises'){
            if(window.confirm('Вы уверены что хотите покинуть страницу? Все несохраненные данные будут удалены.')){
                navigate('/home')
            }
        }
        else {
            navigate('/home')
        }
    }
    const onClickAccount = () => {
        if(location.pathname =='/exercises'){
            if(window.confirm('Вы уверены что хотите покинуть страницу? Все несохраненные данные будут удалены.')){
                navigate('/account')
            }
        }
        else {
            navigate('/account')
        }
    }
    return (
        <div className="header">
           <img onClick={() => onClickHome()} src="/img/logo.svg" alt="logo" />
            <img onClick={() => onClickAccount()} src="/img/account.svg" alt="account" />
        </div>
    )
}