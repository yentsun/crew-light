import React, { useContext, useEffect } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { actionTypes as a, routes } from '../../dictionary';
import { getSettingsFromStorage, getTokenFromStorage, storeSettings } from '../../localStorage';
import GlobalContext from '../../globalContext';
import '../Root/root.css';
import jwtDecode from "jwt-decode";


export default function Root() {

    const navigate = useNavigate();
    const { companyId: companyIdFromRoute } = useParams();
    const rootRoute = useMatch(routes.root);
    const { dispatch, state: { settings, token, selfId }} = useContext(GlobalContext);

    // 🔑📤 load token from storage
    useEffect(() => {

        if (token !== null) return;

        const tokenFromStorage = getTokenFromStorage();

        if (tokenFromStorage) {
            console.debug('🔑📤✅ got token from storage');
            const { uid: selfId } = jwtDecode(tokenFromStorage);
            console.debug('👤🆔 got user ID from token', selfId);
            dispatch({ type: a.TOKEN_RECEIVED, token: tokenFromStorage, selfId });
        }

        if (! tokenFromStorage) {
            console.debug('🔑📤❌ no token in storage');
            dispatch({ type: a.TOKEN_RECEIVED, token: false });
        }

    }, [ token, dispatch, navigate ]);

    // ⚙📤 LOAD SETTINGS WHEN TOKEN IS AVAILABLE
    useEffect(() => {

        if (! selfId) return;

        const settingsFromStorage = getSettingsFromStorage(selfId);
        dispatch({ type: a.SETTINGS_LOADED, settings: settingsFromStorage });
        console.debug('👤⚙✅ got user settings from storage', settingsFromStorage);

    }, [ selfId, dispatch, companyIdFromRoute ]);

    // ⚙💾 STORE SETTINGS ON CHANGE
    useEffect(() => {

        if (selfId && settings) {
            storeSettings(selfId, settings);
            console.debug('👤⚙💾 updated user settings stored');
        }

    }, [ selfId, settings ]);

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

    // ⏩ redirect to and from root
    useEffect(() => {

        if ((! rootRoute && token === false) || (rootRoute && token === false)) {
            console.debug('⏩ redirecting to login');
            navigate(routes.login);
        }

        if (rootRoute && token) {
            console.debug('⏩ redirecting to dashboard 🎛️');
            navigate(routes.dashboard);
        }

    }, [ rootRoute, token, navigate ]);

    return <div id="main" data-component="Root">
        <Outlet />
    </div>;
}
