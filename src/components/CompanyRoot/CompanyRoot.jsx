import React, { useContext, useEffect } from 'react';
import { generatePath, NavLink, useParams } from 'react-router-dom';
import { actionTypes, routes } from '../../dictionary';
import GlobalContext from '../../globalContext';
import useGetCompany from '../CompanyList/useGetCompany';


/**
 * Company root component. User sees their stats in the company and can pick
 * a campaign to upload to.
 *
 */

export default function CompanyRoot() {

    const { dispatch, state: { campaigns }} = useContext(GlobalContext);
    const { companyId } = useParams();
    const company = useGetCompany(companyId);

    useEffect(() => {

        if (company)
            dispatch({ type: actionTypes.COMPANY_SELECTED, company });

    }, [ company, dispatch ]);

    return (<div id="company-root" className="main-menu">

        { company && <>
            <h1>{ company.name }</h1>

            <table>
                <tbody>
                { campaigns.map( ({ id, name }) =>
                    <tr key={ id }>
                        <td>
                            <NavLink to={ generatePath(routes.campaignRoot, { campaignId: id }) }>
                                { name }
                            </NavLink>
                        </td>

                        <td>{ 0 }</td>
                    </tr>) }

                </tbody>
            </table>
        </> }

    </div>);
}
