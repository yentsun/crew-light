import { useContext, useEffect, useState } from 'react';
import { actionTypes as a, words as w } from '../../dictionary';
import BaseContext from '../Base/BaseContext';
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
    // const [ companies ] = useGetCompanies();
    // const [ campaigns ] = useGetCampaigns();
    // const [ logs ] = useGetLogs();

    // user
    useEffect(() => {

        if (self) {
            dispatch({ type: a.SELF_BOOTSTRAPPED, self });
            setCompleteTasks(e => [...e, w.self ]);
            console.debug('self data bootstrapped');
        }

    }, [ self, dispatch ]);
    //
    // // companies
    // useEffect(() => {
    //
    //     if (companies) {
    //         dispatch({ type: a.COMPANIES_BOOTSTRAPPED, companies })
    //         setCompleteTasks(e => [...e, w.companies ]);
    //     }
    //
    // }, [ companies ]);
    //
    // // campaigns
    // useEffect(() => {
    //
    //     if (campaigns) {
    //         dispatch({ type: a.CAMPAIGNS_BOOTSTRAPPED, campaigns })
    //         setCompleteTasks(e => [...e, w.campaigns ]);
    //     }
    //
    // }, [ campaigns ]);
    //
    // // logs
    // useEffect(() => {
    //
    //     if (logs) {
    //         dispatch({ type: a.LOGS_BOOTSTRAPPED, logs })
    //         setCompleteTasks(e => [...e, w.logs ]);
    //     }
    //
    // }, [ logs ]);


    return (
        <div id="bootsrapper">
            <h1>⏳ Please wait</h1>
            <div>we are fetching your stuff... </div>
            <progress style={{ width: '100%' }} max="100" value={ completeTasks.length * 25 } />
        </div>
    )
}
