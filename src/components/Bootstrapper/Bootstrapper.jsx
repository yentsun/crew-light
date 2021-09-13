import { useContext, useEffect, useState } from 'react';
import { backpack } from '../../index';
import { actionTypes, words as w } from '../../dictionary';
import { BaseContext } from '../Base/reducer';
import useGetSelf from './useGetSelf';


/**
 * One-time fetch required inventory into the **STATE** while displaying
 * a friendly message with a progress bar.
 *
 * Inventory includes:
 * - user data (self)
 * - companies
 * - campaigns
 * - logs
 *
 * @component
 */

export default function Bootstrapper() {

    const { dispatch } = useContext(BaseContext);
    const [ completeTasks, setCompleteTasks ] = useState([]);
    const [ self ] = useGetSelf();
    const [ getCompanies, companies ] = useGetCompanies();
    const [ getCampaigns, campaigns ] = useGetCampaigns();
    const [ getLogs, logs ] = useGetLogs();

    // user
    useEffect(() => {

        if (! self) return;


        dispatch({ type: actionTypes.SELF_DATA_RECEIVED, data: self });
        backpack.users.put(self).then(() => {
            setCompleteTasks(e => [...e, w.self ]);
        });

    }, [ self ]);

    // companies
    useEffect(() => {

        if (! companies) return;

        backpack.companies.bulkAdd(companies).then(() => {
            setCompleteTasks(e => [...e, w.companies ]);
        });

    }, [ companies ]);


    return (
        <div id="bootsrapper">
            <h1>⏳ Please wait</h1>
            <div>we are fetching your stuff... </div>
            <progress style={{ width: '100%' }} max="100" value={ completeTasks.length * 25 } />
        </div>
    )
}
