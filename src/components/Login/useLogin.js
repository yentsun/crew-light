import jwtDecode from 'jwt-decode';
import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBackend from '../../hooks/useBackend';
import { actionTypes as a, routes } from '../../dictionary';
import { storeToken } from '../../localStorage';
import GlobalContext from '../../globalContext';


export default function useLogin() {

    const navigate = useNavigate();
    const { dispatch } = useContext(GlobalContext);
    const [ request, state ] = useBackend();


    const login = useCallback((credentials) => {

        if (credentials)
            request({ method: 'POST', url: '/login', data: credentials, requiresAuth: false });

    }, [ request ])

    useEffect(() => {
        const token = state.json?.token;

        if (! token) return;

        console.debug('🔑📡✅ got token from remote');
        const { uid: selfId } = jwtDecode(token);
        console.debug('👤🆔 got user ID from token', selfId);
        dispatch({ type: a.TOKEN_RECEIVED, token, selfId });
        storeToken(token);
        navigate(routes.dashboard);

    }, [ state, dispatch, navigate ]);

    return [ login, state ];
}
