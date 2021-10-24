import React, { useContext } from 'react';
import useLogout from '../hooks/useLogout';
import BaseContext from './Base/BaseContext';


export default function TopBar() {

    const { state: { self }} = useContext(BaseContext);
    const logOut = useLogout();

    return (<div id="top-bar">

        <div id="player-menu" onClick={ () => logOut() }>👤 { self.email }</div>

    </div>);
}
