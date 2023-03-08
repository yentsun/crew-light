import jwtDecode from 'jwt-decode';
import React, { useContext, useEffect } from 'react';
import { generatePath, Outlet, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { actionTypes as a, routes } from '../../dictionary';
import { clearTokenFromStorage, getSettingsFromStorage, getTokenFromStorage,
         storeSettings, storeToken } from '../../localStorage';
import GlobalContext from '../../globalContext';
import '../Root/root.css';


export default function Root() {

    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const { companyId: companyIdFromRoute } = useParams();
    const rootRoute = useMatch(routes.root);
    const { dispatch, state: { settings, token, user,
                               companyId: companyIdFromState }} = useContext(GlobalContext);

    // 🔑📤 load token from storage
    useEffect(() => {

        if (token !== null) return;

        const tokenFromStorage = getTokenFromStorage();

        if (tokenFromStorage) {
            console.debug('🔑📤✅ got token from storage');
            dispatch({ type: a.TOKEN_RECEIVED, token: tokenFromStorage });
        }

        if (! tokenFromStorage) {
            console.debug('🔑📤❌ no token in storage');
            dispatch({ type: a.TOKEN_RECEIVED, token: false });
        }

    }, [ token, dispatch, navigate ]);

    // ⚙📤 LOAD SETTINGS WHEN TOKEN IS AVAILABLE
    useEffect(() => {

        if (! token) return;

        const { uid } = jwtDecode(token);
        console.debug('👤🆔 got user ID from token', uid);
        const settingsFromStorage = getSettingsFromStorage(uid);
        dispatch({ type: a.SETTINGS_LOADED, settings: settingsFromStorage });
        console.debug('👤⚙📤✅ got user settings from storage', settingsFromStorage);


    }, [ token, dispatch, companyIdFromRoute ]);

    // ⚙💾 STORE SETTINGS ON CHANGE
    useEffect(() => {

        if (user && settings) {
            storeSettings(user.id, settings);
            console.debug('👤⚙💾 updated user settings stored');
        }

    }, [ user, settings ]);

    // add window width tracking
    useEffect(() => {
        function dispatchEvent() {
            dispatch({ type: a.WINDOW_WIDTH_CHANGED, width: window.innerWidth })
        }

        dispatchEvent();
        window.addEventListener('resize', dispatchEvent);

        return () =>
            window.removeEventListener('resize', dispatchEvent);
    }, [ dispatch ]);

    // 🔑🌎 handle token presence in URL
    useEffect(() => {

        const params = new URLSearchParams(search);
        const token = params.get('token');

        // skip if there is no 'token' key
        if (token === undefined) return;

        // if token value is empty string - logout
        if (token === '') {
            dispatch({ type: a.TOKEN_RECEIVED, token: false });
            clearTokenFromStorage();
        }

        // otherwise store the token and update state
        if (token) {
            dispatch({ type: a.TOKEN_RECEIVED, token });
            navigate(pathname);
            storeToken(token);
        }
    }, [ search, navigate, pathname, dispatch ]);

    // ⏩ redirect to and from root
    useEffect(() => {

        if ((! rootRoute && companyIdFromRoute && token === false) || (rootRoute && token === false)) {
            console.debug('⏩ redirecting to login');
            navigate(routes.login);
        }

        if (rootRoute && companyIdFromState && token) {
            console.debug('⏩ redirecting to company root 🆔', companyIdFromState);
            navigate(generatePath(routes.companyRoot, { companyId: companyIdFromState }));
        }

    }, [ rootRoute, companyIdFromRoute, companyIdFromState, token, navigate ]);

    return <div id="main"><Outlet /></div>;
}
