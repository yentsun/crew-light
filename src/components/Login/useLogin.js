import { useEffect, useState } from 'react';
import useSimpleCrewAPI from '../../hooks/useSimpleCrewAPI';


export default function useLogin() {

    const [ request, state ] = useSimpleCrewAPI();
    const [ credentials, setCredentials ] = useState(null);

    useEffect(() => {

        console.log(credentials)

        if (credentials)
            request({ method: 'POST', url: '/login', data: credentials });

        setCredentials(null);

    }, [ credentials, request ])

    return [ setCredentials, state.body ];
}
