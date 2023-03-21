import React from "react";

function Login({ onLogin, isRender }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    return (
        <section className='entrance page__center'>
            <div className='entrance__container'>
                <h2 className='entrance__title'>Login</h2>
                <form className='entrance__form' onSubmit={handleSubmit}>
                    <input className='entrance__input' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
                    <input className='entrance__input' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                    <button className='entrance__button-submit' type='submit'>{isRender ? 'Cheking...' : 'Login'}</button>
                </form>
            </div>
        </section>
    )
}

export default Login;