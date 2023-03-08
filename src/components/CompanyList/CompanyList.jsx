import React, { useContext } from 'react';
import { generatePath, NavLink } from 'react-router-dom';
import { routes, words } from '../../dictionary';
import GlobalContext from '../../globalContext';


/**
 * Main menu area, first thing a user sees after login or opening the app
 *
 */
export default function CompanyList() {

    const { state: { self }} = useContext(GlobalContext);

    return (<div id="company-list" className="main-menu">

        <h1>Choose a {words.company}</h1>

        <table>
            <tbody>
            { self.roles.filter(({ role }) => ! role.includes('sus')).map( ({ companyId, companyName, role }) =>
                <tr key={ companyId }>
                    <td>
                        <NavLink to={ generatePath(routes.companyRoot, { companyId }) }>
                            { companyName }
                        </NavLink>
                    </td>

                    <td>{ role }</td>
                </tr>) }

            </tbody>
        </table>

    </div>);
}
