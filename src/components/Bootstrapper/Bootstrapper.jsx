import {useEffect, useState} from 'react';


export default function Bootstrapper() {

    const [ progress, setProgress ] = useState(0);

    const [ getCompanies, companies ] = useGetCompanies();

    useEffect();

    return (
        <div id="bootsrapper">
            <h1>⏳ Please wait</h1>
            <div>we are fetching your stuff... </div>
            <progress style={{ width: '100%' }} max="100" value={ progress } />
        </div>
    )
}
