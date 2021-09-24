import { useEffect, useState } from 'react';
import { fetchFromSCAPI } from '../../hooks/useSCAPI';
import { backpack } from '../../index';
import { keys } from '../../dictionary';


/**
 * One-time fetch user logs via Dexie or SCAPI.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - logs array
 */

export default function useGetLogs() {

    const [ logs, setLogs ] = useState(null);

    useEffect(() => {

        async function getLogs() {

            console.debug('getting logs from backpack...');
            const foundInBackpack = await backpack.logs.toArray();

            if (foundInBackpack.length) {
                setLogs(foundInBackpack);
                return;
            }

            console.debug('fetching logs from remote...');
            const response = await fetchFromSCAPI({
                method: 'GET',
                url: `/logs?userId=${localStorage.getItem(keys.selfId)}` });

            if (response) {
                await backpack.logs.bulkAdd(response.json);
                setLogs(response.json);
            }
        }

        getLogs();

    }, []);

    return [ logs ];
}
