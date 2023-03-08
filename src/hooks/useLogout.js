import { useState, useEffect, useContext } from 'react';
import { clearTokenFromStorage } from '../localStorage';
import { actionTypes as a } from '../dictionary';
import GlobalContext from '../globalContext';


/**
 * Log out current user
 *
 * @return {Function}
 * */
export default function useLogout() {

    const { dispatch, state: { user, company, token }} = useContext(GlobalContext);
    const [ logoutWaiting, setLogoutWaiting ] = useState(true);

    // TRACK LOGOUT AND RESET STATE + CLEAR TOKEN
    useEffect(() => {

        if (logoutWaiting) return;

        console.debug('👤💨 logging out...');

        clearTokenFromStorage();
        dispatch({ type: a.RESET });
        setLogoutWaiting(true);

        console.debug('👤💨✅ logged out successfully');

    }, [ logoutWaiting, token, user, company, dispatch ]);

    return setLogoutWaiting;
}
