import React from 'react';
import useLogout from '../hooks/useLogout';
import { displayUserName } from "../util";


export default function TopBar({ self }) {

    const logOut = useLogout();

    return <div id="top-bar">

        <div onClick={ () => logOut() }>
            👤 { displayUserName(self) } /
            🏢 { self.roles[0].companyName } /
            📍 {self.companyLogCount[self.roles[0].companyId]}</div>

    </div>;
}
