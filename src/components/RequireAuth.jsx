import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { keys, routes } from '../dictionary';
import GlobalContext from '../globalContext';


export default function RequireAuth({ children }) {

    const { state: { token }} = useContext(GlobalContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // check for token
    useEffect(() => {

        if (token === false) {
            console.debug('🔑❗ token required for this route', pathname);
            navigate(`${routes.login}${pathname ? `?${keys.redirectTo}=` + pathname : ''}`)
        }
    }, [ token, pathname, navigate ]);

    return token ? children : <></>;
}
