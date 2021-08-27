import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { actionTypes, routes as r, words as w } from '../dictionary';
import { BaseContext } from '../components/Base/reducer';


export default function useLogout() {

    const history = useHistory();
    const { dispatch } = useContext(BaseContext);
    const [ isWaiting, setIsWaiting ] = useState(true);

    useEffect(() => {

        async function doLogOut() {
            console.debug('clearing user data from storage...');
            dispatch({ type: actionTypes.USER_LOGGED_OUT });

            console.debug(`redirecting to ${w.login} screen`);
            history.push(r.login);
        }

        if (! isWaiting)
            doLogOut();

    }, [ isWaiting, dispatch, history ]);

    return setIsWaiting;
}
