import { useEffect, useState } from 'react';
import useSimpleCrewAPI from '../../hooks/useSimpleCrewAPI';
import {backpack} from "../../index";
import {keys} from "../../dictionary";


/**
 * One-time fetch user data (self) via Dexie or API.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - [ <user data> ]
 */

export default function useGetSelf() {

    const [ self, setSelf ] = useState(null);
    const [ localRecordFound, setLocalRecordFound ] = useState(null);
    const [ request, response ] = useSimpleCrewAPI();

    // get from local storage
    useEffect(() => {

        // initial try
        if (self === null) return;

        backpack.users.get(localStorage.getItem(keys.selfId)).then(self => setSelf(self || false));

    }, [ self ]);

    // request from remote
    useEffect(() => {

        if (localRecord === false)  // we already checked backpack
            request({ method: 'GET', url: '/user' });

    }, [ request, localRecord ]);

    // store locally
    useEffect(() => {

        if (response.json)
            backpack.users.add(response.json).then(self => setSelf(self));

    }, [ response.json ]);

    return [ localRecord || response.json ];
}
