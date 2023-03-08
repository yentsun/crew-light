import { useEffect, useState } from 'react';
import { fetchFromBackend } from '../../hooks/useBackend';
import { backpack } from '../../index';
import { keys } from '../../dictionary';


/**
 * One-time fetch user logs via Dexie or SCAPI.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - logs array
 */

export default function useLogs() {

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
            const response = await fetchFromBackend({
                method: 'GET',
                headers: {
                    'accept': 'application/x-ndjson',
                    'x-payload-shape': 'clean'
                },
                url: `/logs?userId=${localStorage.getItem(keys.selfId)}` });

            if (response) {

                // response.body should be a stream at this point
                const reader = response.body.getReader();
                let textBuffer = [];

                async function readAndStore() {

                    const { value, done } = await reader.read();

                    if (done) {
                        // store leftover line
                        await backpack.logs.add(JSON.parse(textBuffer.join('')));

                        // fetch everything as result
                        const foundInBackpack = await backpack.logs.toArray();
                        setLogs(foundInBackpack);
                        return;
                    }

                    const textChunk = new TextDecoder('utf-8').decode(value);
                    textBuffer = [...textBuffer, ...textChunk ];
                    const parsedItems = [];

                    while (textBuffer.indexOf('\n') > 0) { // while separator is somewhere in the chunk
                        const position = textBuffer.indexOf('\n');

                        // extract first line
                        const jsonStringArray = textBuffer.splice(0, position);

                        // remove leftover \n separator
                        textBuffer.shift();

                        // parse and send object upstream
                        parsedItems.push(JSON.parse(jsonStringArray.join('')))
                    }

                    console.log(parsedItems)

                    // store log batch
                    await backpack.logs.bulkAdd(parsedItems);

                    readAndStore();
                }

                readAndStore();
            }
        }

        getLogs();

    }, []);

    return [ logs ];
}
