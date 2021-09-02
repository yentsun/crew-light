import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { words as w, routes as r } from '../../dictionary';
import './login.css';
import Logo from '../../Logo.svg';


export default function Login() {

    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        history.push(r.mainMenu);
    }

    return (
        <form id="login" onSubmit={ handleSubmit }>

            <img id="logo" src={ Logo } alt="Crew Light logo" />

            <h1>🔒 { w.login }</h1>

            <label htmlFor={ w.email }>{ w.email }</label>
            <input id={ w.email } type="text" value={ email }
                   onChange={ (e) => setEmail(e.target.value) }/>

            <label htmlFor={ w.password }>{ w.password }</label>
            <input id={ w.password } type="password" value={ password }
                   onChange={ (e) => setPassword(e.target.value) }/>

            <button className="primary" type="submit">{ w.submit }</button>

            <a target="blank" href="https://app.simplecrew.com/register">Don't have an account?</a>

        </form>
    );
}