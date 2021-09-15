import { useEffect, useState } from 'react';
import { requestFromSCAPI } from '../../hooks/useSCAPI';
import { backpack } from '../../index';
import { keys } from "../../dictionary";


/**
 * One-time fetch user data (self) via Dexie or API.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - [ <user data> ]
 */

export default function useGetSelf() {

    const [ self, setSelf ] = useState(null);

    useEffect(() => {

        async function getSelf() {

            console.debug('getting self from backpack...');
            const foundInBackpack = await backpack.users.get(localStorage.getItem(keys.selfId));

            if (foundInBackpack) {
                setSelf(foundInBackpack);
                return;
            }

            console.debug('fetching self from remote...');
            const response = await requestFromSCAPI({ method: 'GET', url: '/user' });

            if (response) {
                await backpack.users.add(response.json);
                setSelf(response.json);
            }
        }

        getSelf();

    }, []);

    return [ self ];
}
