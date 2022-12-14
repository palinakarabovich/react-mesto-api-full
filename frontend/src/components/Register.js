import React from "react";
import { Link } from 'react-router-dom';

function Register({onRegister, isRender}) {

    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <section className='entrance page__center'>
            <div className='entrance__container'>
                <h2 className='entrance__title'>Регистрация</h2>
                <form className='entrance__form' onSubmit={handleSubmit}>
                    <input className='entrance__input' type='email' placeholder='Email' value={email} onChange={handleEmailChange}/>
                    <input className='entrance__input' type='password' placeholder='Пароль' value={password} onChange={handlePasswordChange}/>
                    <button className='entrance__button-submit' type='submit'>{isRender ? 'Обработка...' : 'Зарегестрироваться' }</button>
                </form>
                <Link to='/sign-in' className='entrance__link'>Уже зарегистрированы? Войти</Link>
            </div>
        </section>
    )
}

export default Register;