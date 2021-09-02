import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { routes } from '../dictionary';
import { BaseContext } from './Base/reducer';


export default function PrivateRoute({ component: Component, ...rest }) {

    const { state: { self }} = useContext(BaseContext);

    return (
        <Route { ...rest } render={(props) => {

            if (self) {
                return <Component {...rest} {...props} />
            }

            if (! self) {
                // we do not have token stored (logged out)
                return props.location.pathname !== routes.login
                    ? <Redirect to={ routes.login } />
                    : null
            }
        }}/>
    )
};
