import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionTypes as a, routes } from '../dictionary';
import GlobalContext from '../globalContext';
import useBackend from './useBackend';


export default function useSelf() {

    const { dispatch, state: { self: selfFromState }} = useContext(GlobalContext);
    const navigate = useNavigate();
    const [ callBackend, state ] = useBackend({ requiresAuth: true });

    // 👤📡 PERFORM CALL
    useEffect(() => {

        if (selfFromState) return;

        console.debug('👤📡 fetching self');
        callBackend({ method: 'GET', url: '/user' });

    }, [ callBackend, selfFromState ]);

    // 👤⬆ SEND USER DETAILS TO CONTEXT
    useEffect(() => {

        const self = state.data;

        if (self) {
            console.debug('👤✔ self fetched:', self.id, self.email);
            dispatch({ type: a.SELF_FETCHED, user: self });
        }

        if (state.hasFailed) {
            console.debug('👤❌ self fetch failed, going to login');
            navigate(routes.login);
        }

    }, [ state, dispatch, navigate ]);

    return [ selfFromState ];
}
