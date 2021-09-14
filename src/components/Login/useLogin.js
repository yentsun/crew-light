import { useEffect, useState } from 'react';
import useSCAPI from '../../hooks/useSCAPI';


export default function useLogin() {

    const [ request, state ] = useSCAPI();
    const [ credentials, setCredentials ] = useState(null);

    // get the auth token
    useEffect(() => {

        if (credentials)
            request({ method: 'POST', url: '/login', data: credentials, requiresAuth: false });

    }, [ credentials, request ])

    return [ setCredentials, state ];
}
