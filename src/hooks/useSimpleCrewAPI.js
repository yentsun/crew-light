import { useEffect, useReducer, useState } from 'react';
import { actionTypes as a } from '../dictionary';


const initialState = {
    hasStarted: false,
    isInProgress: false,
    hasFinished: false,
    hasFailed: null,
    hasSucceeded: null,
    body: null,
    json: null,
    errorMessage: null,
    status: null
};

function reducer(state, action) {

    switch (action.type) {

        case a.START:
            return {
                ...initialState,
                isInProgress: true,
                hasStarted: true };

        case a.SUCCESS:
            const { status, body, headers, json } = action.response;
            return {
                ...state,
                hasSucceeded: true,
                hasFailed: false,
                isInProgress: false,
                hasFinished: true,
                status,
                body,
                json,
                headers
            };

        case a.ERROR:
            return {
                ...state,
                hasSucceeded: false,
                hasFailed: true,
                isInProgress: false,
                hasFinished: true,
                ...action.response && {
                    status: action.response.status,
                    errorMessage: action.response.message,
                    headers: action.response.headers
                }};

        default:
            throw new Error('Unknown action type');
    }
}

export default function useSimpleCrewAPI() {

    const [ requestConfig, setRequestConfig ] = useState(null);
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {

        async function performRequest() {

            console.debug('requesting', requestConfig);

            try {
                const { url, token, headers, data, ...resOfConfig } = requestConfig;

                if (! url) {
                    console.error('url is not provided');
                    return;
                }

                dispatch({ type: a.START });

                const response = await fetch(`${process.env.REACT_APP_SC_API_BASEURL}${url}`, {
                    headers: {
                        ...data && { 'Content-Type': 'application/json' },
                        ...token && { 'Authorization': `Bearer ${token}` }
                    },
                    ...data && { body: JSON.stringify(data) },
                    ...resOfConfig
                });

                // check if response is JSON and if so - parse it to `response.json`
                if (response.headers.get('content-type').includes('application/json')) {
                    response.json = await response.json();
                    console.debug('got response:', response.json);
                }

                // check if response has 'unsuccessful' status
                if (! response.ok) {
                    console.error('Error message:', response.status, response.body);
                    console.debug('Original request ID:', response.headers.get('x-request-id'));
                    dispatch({ type: a.ERROR, response });
                    return;
                }

                dispatch({ type: a.SUCCESS, response });

            } catch (error) {
                console.error('Unexpected:', error.message, requestConfig);
                dispatch({ type: a.ERROR });
            }
        }

        if (requestConfig)
            performRequest();

    }, [ requestConfig ]);

    return [ setRequestConfig, state ];
}
