import React from 'react';
import { actionTypes as a } from '../../dictionary';


/***************** ⚠️ WARNING ***********************
 *                                                  *
 *        AS FEW ACTIONS AS POSSIBLE HERE           *
 *                                                  *
 *****************************************************/

export const initialState = {
    self: null,
    bootstrapped: false,
    companies: null,
    campaigns: null,
    logs: null
};


export const reducer = (state, action) => {

    switch (action.type) {

        case a.SELF_BOOTSTRAPPED:
            return {...state,
                self:  action.self };

        case a.COMPANIES_BOOTSTRAPPED:
            return {...state,
                companies: action.companies }

        case a.CAMPAIGNS_BOOTSTRAPPED:
            return {...state,
                campaigns: action.campaigns }

        case a.LOGS_BOOTSTRAPPED:
            return {...state,
                logs: action.logs }

        case a.ALL_BOOTSTRAPPED:
            return {...state,
                bootstrapped: true
            }

        case a.LOGGED_OUT:
            return initialState;

        default:
            throw new Error('unknown action type');
    }

}

const BaseContext = React.createContext();

export default BaseContext;
