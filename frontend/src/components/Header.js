import logoPath from '../images/mesto-logo.png';
import { Link, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
    return (
        <header className="header page__center">
            <a href="#" className="header__link link-style"><img src={logoPath} alt="Logo" className="logo" /></a>
            <div className='header__container'>
                <p className='header__email'>{email}</p>
                <Route exact path='/sign-up'>
                    <Link to='sign-in' className='header__link'>Login</Link>
                </Route>
                <Route exact path='/sign-in'>
                    <Link to='sign-up' className='header__link'>Register</Link>
                </Route>
                <Route exact path='/'>
                    <Link to='sign-in' className='header__link' onClick={onSignOut}>Logout</Link>
                </Route>
            </div>
        </header>
    )
}

export default Header;