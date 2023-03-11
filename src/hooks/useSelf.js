import { useContext, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../globalContext';
import useBackend from './useBackend';
import { backpack } from '../index';
import {routes} from "../dictionary";


export default function useSelf() {

    const navigate = useNavigate();
    const { state: { selfId }} = useContext(GlobalContext);
    const [ callBackend, state ] = useBackend({ requiresAuth: true });

    const [ self, hadALook ] = useLiveQuery(() =>
        backpack.users.get(selfId)
            .then(res => [ res, true ]), [ selfId ], []);

    useEffect(() => {

        if (hadALook && ! self) {
            console.debug('👤📡 fetching self');
            callBackend({ method: 'GET', url: '/user' });
        }

    }, [ hadALook, self, callBackend ]);

    useEffect(() => {

        const self = state.json;

        if (self) {
            console.debug('👤🎒💾 storing self', self.email);
            backpack.users.add(self);
        }

        if (state.hasFailed) {
            console.debug('👤📡❌ self fetch failed, going to login');
            navigate(routes.login);
        }

    }, [ state, navigate ]);

    return [ self ];
}
