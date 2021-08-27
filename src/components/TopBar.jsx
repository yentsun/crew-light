import React, { useContext } from 'react';
import useLogout from '../hooks/useLogout';
import { BaseContext } from './Base/reducer';


const formatter = new Intl.NumberFormat({
    style: 'decimal'
});

export default function TopBar() {

    const { state: { self }} = useContext(BaseContext);
    const logOut = useLogout();

    return (<div id="top-bar">

        <div id="resources">stats</div>

        <div id="balance">{ self ? formatter.format(self.balance) : 'loading...' }</div>

        <div id="player-menu" onClick={ () => logOut() }>{ self.email }</div>

    </div>);
}
