import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { routes } from '../dictionary';
import { BaseContext } from './Base/reducer';


export default function PrivateRoute({ component: Component, ...rest }) {

    const { pathname } = useLocation();
    const { state: { self }} = useContext(BaseContext);

    return (
        <Route { ...rest } render={(props) => {

            if (self) {
                return <Component {...rest} {...props} />
            }

            if (! self) {
                // we do not have token stored (logged out)
                return props.location.pathname !== routes.login
                    ? <Redirect to={ `${routes.login}${pathname ? '?redirectTo='+pathname : ''}` } />
                    : null
            }
        }}/>
    )
};
