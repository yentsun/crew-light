import { useEffect, useState } from 'react';
import { fetchFromBackend } from '../../hooks/useBackend';
import { backpack } from '../../index';
import { keys } from '../../dictionary';


/**
 * One-time fetch user data (self) via Dexie or API.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - [ <user data> ]
 */

export default function useSelf() {

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
            const response = await fetchFromBackend({ method: 'GET', url: '/user' });

            if (response) {
                await backpack.users.add(response.json);
                setSelf(response.json);
            }
        }

        getSelf();

    }, []);

    return [ self ];
}
