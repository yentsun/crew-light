import React, { useContext } from 'react';
import BaseContext from './Base/BaseContext';


/**
 * Main menu area, first thing a user sees after login or opening the app
 *
 */
export default function MainMenu() {

    const { state: { self }} = useContext(BaseContext);

    return (<div id="main-menu">

        <h1>Choose a company</h1>

        <table>
            <tbody>
            { self.roles.map( ({ companyId, companyName, role }) =>
                <tr key={ companyId }>
                    <td>{ companyName }</td>
                    <td>{ role }</td>
                </tr>) }

            </tbody>
        </table>

    </div>);
}
