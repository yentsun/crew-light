import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { words as w, routes as r } from '../../dictionary';
import './login.css';


export default function Login() {

    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        history.push(r.dashboard);
    }

    return (
        <form id="login" onSubmit={ handleSubmit }>

            <h1>{ w.login }</h1>

            <label htmlFor={ w.email }>{ w.email }</label>
            <input id={ w.email } type="text" value={ email }
                   onChange={ (e) => setEmail(e.target.value) }/>

            <label htmlFor={ w.password }>{ w.password }</label>
            <input id={ w.password } type="password" value={ password }
                   onChange={ (e) => setPassword(e.target.value) }/>

            <button className="primary" type="submit">{ w.submit }</button>

        </form>
    );
}
