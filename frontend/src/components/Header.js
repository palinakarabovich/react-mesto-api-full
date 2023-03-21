import logoPath from '../images/mesto-logo.png';
import { Link, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
    return (
        <header className="header page__center">
            <a href="#" className="header__link link-style"><img src={logoPath} alt="Logo" className="logo" /></a>
            <div className='header__container'>
                <p className='header__email'>{email}</p>
                <Route exact path='/react-mesto-api-full/sign-up'>
                    <Link to='/react-mesto-api-full/sign-in' className='header__link'>Login</Link>
                </Route>
                <Route exact path='/react-mesto-api-full/sign-in'>
                    <Link to='/react-mesto-api-full/sign-up' className='header__link'>Register</Link>
                </Route>
                <Route exact path='/react-mesto-api-full/'>
                    <Link to='/react-mesto-api-full/sign-in' className='header__link' onClick={onSignOut}>Logout</Link>
                </Route>
            </div>
        </header>
    )
}

export default Header;