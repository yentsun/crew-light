import React from 'react';
import {actionTypes as a, constants} from './dictionary';


/***************** ⚠️ WARNING ***********************
 *                                                  *
 *        AS FEW ACTIONS AS POSSIBLE HERE           *
 *                                                  *
 *****************************************************/

export const initialState = {
    self: null,
    bootstrapped: false,
    companies: null,
    company:null,
    campaigns: null,
    logs: null
};


export const reducer = (state, action) => {

    console.debug('pre-action state:', state);
    console.debug('action:', action);

    switch (action.type) {

        case a.SELF_FETCHED:
            return {...state,
                self:  action.self };

        case a.COMPANY_SELECTED:
            return {...state,
                company: action.company
            }

        case a.LOGGED_OUT:
            return initialState;

        case a.WINDOW_WIDTH_CHANGED:
            return {...state,
                isMobile: action.width <= constants.mobileWidthThreshold };

        default:
            throw new Error(`unknown action type: ${action.type}`);
    }

}

const GlobalContext = React.createContext();

export default GlobalContext;
