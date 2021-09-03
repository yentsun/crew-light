import { useEffect, useState } from 'react';
import useSimpleCrewAPI from '../../hooks/useSimpleCrewAPI';


export default function useProfileGetAPI() {

    const [ request, state ] = useSimpleCrewAPI();
    const [ isWaiting, setIsWaiting ] = useState(true);

    useEffect(() => {

        if (! isWaiting)
            request({ method: 'GET', url: '/user' });

    }, [ isWaiting, request ])

    return [ setIsWaiting, state.json ];
}
