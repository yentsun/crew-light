import { useContext, useEffect, useState } from 'react';
import { actionTypes as a, words as w } from '../../dictionary';
import GlobalContext from '../../globalContext';
import useSelf from './useSelf';
import useCampaigns from './useCampaigns';
import useLogs from './useLogs';
import useCompanies from './useCompanies';


/**
 * One-time fetch required inventory into the **STATE** while displaying
 * a friendly message with a progress bar.
 *
 * Inventory includes:
 * - user data (self)
 * - campaigns
 * - logs
 *
 * @component
 */

export default function Bootstrapper() {

    const { dispatch } = useContext(GlobalContext);
    const [ completeTasks, setCompleteTasks ] = useState([]);
    const [ self ] = useSelf();
    const [ companies ] = useCompanies();
    const [ campaigns ] = useCampaigns();
    const [ logs ] = useLogs();

    // notify global when done
    useEffect(() => {

        if (completeTasks.length === 3) {
            dispatch({ type: a.ALL_BOOTSTRAPPED });
            console.debug('all bootstrapped');
        }

    }, [ completeTasks, dispatch ]);

    // user
    useEffect(() => {

        if (self) {
            dispatch({ type: a.SELF_BOOTSTRAPPED, self });
            setCompleteTasks(e => [...e, w.self ]);
            console.debug('self data bootstrapped');
        }

    }, [ self, dispatch ]);

    // companies
    useEffect(() => {

        if (campaigns) {
            dispatch({ type: a.COMPANIES_BOOTSTRAPPED, companies })
            setCompleteTasks(e => [...e, w.companies ]);
            console.debug('companies bootstrapped');
        }

    }, [ companies, dispatch, campaigns ]);

    // campaigns
    useEffect(() => {

        if (campaigns) {
            dispatch({ type: a.CAMPAIGNS_BOOTSTRAPPED, campaigns })
            setCompleteTasks(e => [...e, w.campaigns ]);
            console.debug('campaigns bootstrapped');
        }

    }, [ campaigns, dispatch ]);

    // logs
    useEffect(() => {

        if (logs) {
            dispatch({ type: a.LOGS_BOOTSTRAPPED, logs })
            setCompleteTasks(e => [...e, w.logs ]);
            console.debug('logs bootstrapped');
        }

    }, [ logs, dispatch ]);

    return (
        <div id="bootstrapper">
            <h1>⏳ Please wait</h1>
            <div>we are fetching your stuff... </div>
            <progress style={{ width: '100%' }} max="100" value={ completeTasks.length * 33 } />
        </div>
    );
}
