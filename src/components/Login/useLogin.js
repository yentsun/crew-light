import { useEffect, useState } from 'react';
import useSimpleCrewAPI from '../../hooks/useSimpleCrewAPI';


export default function useLogin() {

    const [ request, state ] = useSimpleCrewAPI();
    const [ credentials, setCredentials ] = useState(null);

    // get the auth token
    useEffect(() => {

        if (credentials)
            request({ method: 'POST', url: '/login', data: credentials, requiresAuth: false });

    }, [ credentials, request ])

    return [ setCredentials, state ];
}
