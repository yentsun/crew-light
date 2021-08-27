import React, { useReducer, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { routes as r } from '../../dictionary';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login/Login';
import TopBar from '../TopBar';
import MainMenu from '../MainMenu';
import { BaseContext, initialState, reducer } from './reducer';
import Logo from '../../Logo.svg';
import './base.css';


export default function Base() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { self } = state;

    // load player data if user is logged in
    useEffect(() => {

        async function loadUserData() {
            // dispatch({ type: a.SELF_DATA_RECEIVED, data: {}});
        }

        if (! self)
            loadUserData();

    }, [ self ]);

    return (
        <BaseContext.Provider value={{ state, dispatch }}>
           <div id="content" className="center">

               { self &&
               <TopBar /> }

                <Router>
                    <Switch>
                        <PublicRoute path={ r.login } component={ Login }/>

                        <PrivateRoute path={ r.mainMenu } component={ MainMenu } />
                        <Redirect to={ r.mainMenu } />
                    </Switch>
                </Router>
            </div>

        </BaseContext.Provider>
    );
}
