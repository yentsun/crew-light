import {useContext, useEffect, useReducer, useState} from 'react';
import { actionTypes as a } from '../dictionary';
import GlobalContext from "../globalContext";


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
            return {...initialState,
                isInProgress: true,
                hasStarted: true };

        case a.SUCCESS:
            const { status, body, headers, json } = action.response;
            return {...state,
                hasSucceeded: true,
                hasFailed: false,
                isInProgress: false,
                hasFinished: true,
                status,
                body,
                json,
                headers };

        case a.ERROR:
            return {...state,
                hasSucceeded: false,
                hasFailed: true,
                isInProgress: false,
                hasFinished: true,
                ...action.response && {
                    status: action.response.status,
                    errorMessage: action.response.message,
                    headers: action.response.headers }};

        default:
            throw new Error('Unknown action type');
    }
}

/**
 * Perform an HTTP request to SimpleCrew Backend via `fetch`.
 * Acts both as in-hook and exported async function.
 *
 * @async
 * @param {Object} config - request config
 * @param {Function | Undefined} dispatch - dispatch function (if used in a hook)
 * @param {String | Undefined} token - Auth token
 * @return {Object | Undefined} fetch response object (success) or null
 */

export async function fetchFromBackend(config, dispatch=()=>{}, token) {

    console.debug('requesting', config);
    const { url, headers, method, data, requiresAuth=true, ...resOfConfig } = config;

    if (! url)
        throw new Error('url is not provided');

    try {
        dispatch({ type: a.START });
        const sendingData = [ 'POST', 'PUT' ].includes(method); // vs getting

        const response = await fetch(`${process.env.REACT_APP_SC_API_BASEURL}${url}`, {
            method,
            headers: {
                ...(data && sendingData) &&
                { 'Content-Type': 'application/json' },

                ...(requiresAuth && token) &&
                { 'Authorization': `Bearer ${token}` },

                ...headers
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
            console.debug('Original request ID:', response.headers.get('x-request-id'));
            console.error('Error message:', response.status, response.body);
            dispatch({ type: a.ERROR, response });
            return;
        }

        dispatch({ type: a.SUCCESS, response });
        return response;

    } catch (error) {
        console.error('Unexpected:', error.message, config);
        dispatch({ type: a.ERROR });
    }
}

export default function useBackend() {

    const { state: { token }} = useContext(GlobalContext);
    const [ requestConfig, setRequestConfig ] = useState(null);
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {

        if (requestConfig)
            fetchFromBackend(requestConfig, dispatch, token);

    }, [ requestConfig, token ]);

    return [ setRequestConfig, state ];
}
