import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { words as w, routes as r, actionTypes } from '../../dictionary';
import { backpack } from '../../index';
import Logo from '../../Logo.svg';
import useLoginAPI from './useLogin';
import useProfileGetAPI from './useProfileGetAPI';
import { BaseContext } from '../Base/reducer';
import './login.css';


export default function Login() {

    const history = useHistory();
    const { dispatch } = useContext(BaseContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ setCredentials, loginState ] = useLoginAPI();
    const [ fetchSelf, self ] = useProfileGetAPI();

    function handleSubmit(e) {
        e.preventDefault();
        setCredentials({ email, password });
    }

    // if token is received: store it and request user data
    useEffect(() => {

        if (! loginState.json || ! loginState.json.token) return;

        const token = loginState.json.token;
        console.debug('storing token...');
        localStorage.setItem('token', token);
        fetchSelf();

    }, [ loginState.json, history, fetchSelf ]);

    // store user data and redirect to main menu
    useEffect(() => {

        if (! self) return;

        localStorage.setItem('selfId', self.id);
        backpack.users.put(self);
        dispatch({ type: actionTypes.SELF_DATA_RECEIVED, data: self });
        history.push(r.mainMenu);

    }, [ self, history ]);

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

            <button disabled={ loginState.isInProgress } className="primary"
                    type="submit">
                { w.submit }
            </button>

            <a target="blank" href="https://app.simplecrew.com/register">Don't have an account?</a>

        </form>
    );
}
