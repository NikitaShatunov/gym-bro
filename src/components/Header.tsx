import { Link } from "react-router-dom"

export const Header: React.FC = () => {
    return (
        <div className="header">
           <Link to='/home'><img src="/img/logo.svg" alt="logo" /></Link>
            <Link to='/account'><img src="/img/account.svg" alt="account" /></Link>
        </div>
    )
}