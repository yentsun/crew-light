import { useEffect } from 'react';
import useSimpleCrewAPI from '../../hooks/useSimpleCrewAPI';


/**
 * One-time fetch user data (self) via API.
 * Request starts immediately.
 *
 * @hook
 * @return {Object[]} - [ <user data> ]
 */

export default function useProfileGetAPI() {

    const [ request, state ] = useSimpleCrewAPI();

    useEffect(() => {

        request({ method: 'GET', url: '/user' });

    }, [ request ])

    return [ state.json ];
}
