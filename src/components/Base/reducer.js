import React from 'react';
import { actionTypes as a } from '../../dictionary';


/*****************!! WARNING !!**********************
 *                                                  *
 *        AS FEW ACTIONS AS POSSIBLE HERE           *
 *                                                  *
 *****************************************************/

export const initialState = {
    self: null
};

export const reducer = (state, action) => {
    switch (action.type) {

        case a.USER_LOGGED_IN:
        case a.SELF_DATA_RECEIVED:

            return {...state,
                self:  action.data
            };

        case a.USER_LOGGED_OUT:
            return initialState;

        default:
            throw new Error('unknown action type');
    }

}

export const BaseContext = React.createContext();
