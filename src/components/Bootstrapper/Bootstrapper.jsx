import { useEffect, useState } from 'react';


/**
 * Fetch required inventory into the **STATE** while displaying
 * a friendly message with a progress bar
 *
 * @component
 */

export default function Bootstrapper() {

    const [ progress, setProgress ] = useState(0);
    const [ getCompanies, companies ] = useGetCompanies();
    const [ getCompanies, companies ] = useGetCampaigns();
    const [ getCompanies, companies ] = useGetLogs();

    useEffect();

    return (
        <div id="bootsrapper">
            <h1>⏳ Please wait</h1>
            <div>we are fetching your stuff... </div>
            <progress style={{ width: '100%' }} max="100" value={ progress } />
        </div>
    )
}
