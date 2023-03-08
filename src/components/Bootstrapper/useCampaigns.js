import { useEffect, useState } from 'react';
import { fetchFromBackend } from '../../hooks/useBackend';
import { backpack } from '../../index';


/**
 * One-time fetch user campaigns via Dexie or API.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - campaigns array
 */

export default function useCampaigns() {

    const [ campaigns, setCampaigns ] = useState(null);

    useEffect(() => {

        async function getCampaigns() {

            console.debug('getting campaigns from backpack...');
            const foundInBackpack = await backpack.campaigns.toArray();

            if (foundInBackpack.length) {
                setCampaigns(foundInBackpack);
                return;
            }

            console.debug('fetching campaigns from remote...');
            const response = await fetchFromBackend({ method: 'GET', url: '/campaigns' });

            if (response) {
                await backpack.campaigns.bulkAdd(response.json);
                setCampaigns(response.json);
            }
        }

        getCampaigns();

    }, []);

    return [ campaigns ];
}
