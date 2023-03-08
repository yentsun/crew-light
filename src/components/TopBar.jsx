import React, { useContext } from 'react';
import useLogout from '../hooks/useLogout';
import GlobalContext from '../globalContext';


export default function TopBar() {

    const { state: { self }} = useContext(GlobalContext);
    const logOut = useLogout();

    return (<div id="top-bar">

        <div id="player-menu" onClick={ () => logOut() }>👤 { self.email }</div>

    </div>);
}
