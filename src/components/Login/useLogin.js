import { useEffect, useState } from 'react';
import useSimpleCrewAPI from '../../hooks/useSimpleCrewAPI';


export default function useLogin() {

    const [ request, state ] = useSimpleCrewAPI();
    const [ credentials, setCredentials ] = useState(null);

    useEffect(() => {

        if (credentials)
            request({ method: 'POST', url: '/login', data: credentials });

    }, [ credentials, request ])

    return [ setCredentials, state ];
}
