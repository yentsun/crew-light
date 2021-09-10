import { useContext, useEffect, useState } from 'react';
import { backpack } from '../../index';
import { actionTypes } from '../../dictionary';
import { BaseContext } from "../Base/reducer";
import useProfileGetAPI from './useProfileGetAPI';


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
    const [ progress, setProgress ] = useState(0);
    const [ self ] = useProfileGetAPI();
    const [ getCompanies, companies ] = useGetCompanies();
    const [ getCampaigns, campaigns ] = useGetCampaigns();
    const [ getLogs, logs ] = useGetLogs();

    // user
    useEffect(() => {

        if (! self) return;

        localStorage.setItem('selfId', self.id);
        dispatch({ type: actionTypes.SELF_DATA_RECEIVED, data: self });
        backpack.users.put(self);
        setProgress(10);

    }, [ self ]);

    // companies
    useEffect(() => {

        if (! companies) return;

        backpack.companies.batch

    }, [ companies ]);


    return (
        <div id="bootsrapper">
            <h1>⏳ Please wait</h1>
            <div>we are fetching your stuff... </div>
            <progress style={{ width: '100%' }} max="100" value={ progress } />
        </div>
    )
}
