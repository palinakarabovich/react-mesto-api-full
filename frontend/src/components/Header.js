import logoPath from '../images/mesto-logo.svg';
import { Link, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
    return (
        <header className="header page__center">
            <a href="#" className="header__link link-style"><img src={logoPath} alt="Логотип" className="logo" /></a>
            <div className='header__container'>
                <p className='header__email'>{email}</p>
                <Route exact path='/sign-up'>
                    <Link to='sign-in' className='header__link'>Войти</Link>
                </Route>
                <Route exact path='/sign-in'>
                    <Link to='sign-up' className='header__link'>Регистрация</Link>
                </Route>
                <Route exact path='/'>
                    <Link to='sign-in' className='header__link' onClick={onSignOut}>Выйти</Link>
                </Route>
            </div>
        </header>
    )
}

export default Header;