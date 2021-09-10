import React, { useReducer, useEffect } from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Redirect,
} from 'react-router-dom';
import { actionTypes, routes as r } from '../../dictionary';
import { backpack } from '../../index';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login/Login';
import TopBar from '../TopBar';
import MainMenu from '../MainMenu';
import { BaseContext, initialState, reducer } from './reducer';
import Bootstrapper from '../Bootstrapper/Bootstrapper';
import '@fontsource/dm-mono';
import './base.css';


export default function Base() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const selfId = localStorage.getItem('selfId');
    const { self, bootstrapped } = state;

    // load player data if user is logged in
    useEffect(() => {

        async function loadSelf() {
            const selfData = await backpack.users.get(selfId);
            dispatch({ type: actionTypes.SELF_DATA_RECEIVED, data: selfData });
        }

        if (selfId && ! self)
            loadSelf();

    }, [ self, selfId ]);

    return (
        <BaseContext.Provider value={{ state, dispatch }}>
            <div id="content" className="center">

                { (self && ! bootstrapped) &&
                <Bootstrapper /> }

                { bootstrapped && <>
                    <TopBar />
                    <Router>
                        <Switch>
                            <PublicRoute path={ r.login } component={ Login }/>

                            <PrivateRoute path={ r.mainMenu } component={ MainMenu } />
                            <Redirect to={ r.mainMenu } />
                        </Switch>
                    </Router>
                </> }

            </div>

        </BaseContext.Provider>
    );
}
