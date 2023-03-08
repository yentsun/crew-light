import React, { useContext, useEffect } from 'react';
import GlobalContext from '../globalContext';
import {actionTypes as a, constants as c, words} from '../dictionary';


export default function Toast({ message, type=words.success }) {

    const { dispatch } = useContext(GlobalContext);

    // remove the message on timeout
    useEffect(() => {

        const timeoutId = setTimeout(
            () => dispatch({ type: a.SUCCESS_DISMISSED }),
            c.toasterTimeout);

        // remove subscription if the message was closed manually
        return () => clearTimeout(timeoutId);

    }, [ dispatch ]);

    return <div className={`toaster ${type}`}>

        { message }

        <button onClick={ () => dispatch({ type: a.SUCCESS_DISMISSED }) }
                className="close" title="Dismiss message">
            ✖
        </button>
    </div>;
}
