import { useEffect, useState } from 'react';
import { fetchFromSCAPI } from '../../hooks/useSCAPI';
import { backpack } from '../../index';


/**
 * One-time fetch user companies via Dexie or API.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - companies array
 */

export default function useGetCompanies() {

    const [ companies, setCompanies ] = useState(null);

    useEffect(() => {

        async function getCompanies() {

            console.debug('getting companies from backpack...');
            const foundInBackpack = await backpack.companies.toArray();

            if (foundInBackpack.length) {
                setCompanies(foundInBackpack);
                return;
            }

            console.debug('fetching companies from remote...');
            const response = await fetchFromSCAPI({ method: 'GET', url: '/companies' });

            if (response) {
                await backpack.companies.bulkAdd(response.json);
                setCompanies(response.json);
            }
        }

        getCompanies();

    }, []);

    return [ companies ];
}
