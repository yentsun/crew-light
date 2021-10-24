import { useEffect, useState } from 'react';
import { backpack } from '../../index';


/**
 * Get company from backpack by its id.
 *
 * @hook
 * @return {Object[]} - company
 */

export default function useGetCompany(id) {

    const [ company, setCompany ] = useState(null);

    useEffect(() => {

        async function getCompany() {

            console.debug('getting company from backpack...');
            const foundInBackpack = await backpack.companies.get(id);

            if (foundInBackpack)
                setCompany(foundInBackpack);

            console.error('company not found in backpack, looked for:', id);
        }

        getCompany();

    }, [ id ]);

    return company;
}
