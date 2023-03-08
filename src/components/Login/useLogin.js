import { useEffect, useState } from 'react';
import useBackend from '../../hooks/useBackend';


export default function useLogin() {

    const [ request, state ] = useBackend();
    const [ credentials, setCredentials ] = useState(null);

    // get the auth token
    useEffect(() => {

        if (credentials)
            request({ method: 'POST', url: '/login', data: credentials, requiresAuth: false });

    }, [ credentials, request ])

    return [ setCredentials, state ];
}
