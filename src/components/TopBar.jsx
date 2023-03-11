import React from 'react';
import useLogout from '../hooks/useLogout';


export default function TopBar({ self }) {

    const logOut = useLogout();

    return (<div id="top-bar">

        <div id="player-menu" onClick={ () => logOut() }>👤 { self.email }</div>

    </div>);
}
