import React, { useReducer } from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { routes as r } from '../../dictionary';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login/Login';
import TopBar from '../TopBar';
import BaseContext, { initialState, reducer } from './BaseContext';
import CompanyList from '../CompanyList/CompanyList';
import Bootstrapper from '../Bootstrapper/Bootstrapper';
import CompanyRoot from '../CompanyRoot/CompanyRoot';
import '@fontsource/dm-mono';
import './base.css';


export default function Base() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { bootstrapped } = state;

    return (
        <BaseContext.Provider value={{ state, dispatch }}>
            <div id="base">

                { ! bootstrapped &&
                <Bootstrapper /> }

                { bootstrapped &&
                <div id="main">
                    <TopBar />
                    <Router>
                        <Switch>
                            <PublicRoute path={ r.login } component={ Login }/>

                            <PrivateRoute path={ r.companyRoot } component={ CompanyRoot } />
                            <PrivateRoute path={ r.companyList } component={ CompanyList } />
                            <Redirect to={ r.companyList } />
                        </Switch>
                    </Router>
                </div> }

            </div>
        </BaseContext.Provider>
    );
}
