import '@fontsource/dm-mono';
import React from 'react';
import useSelf from '../../hooks/useSelf';
import TopBar from '../TopBar';
import './dashboard.css';


export default function Dashboard() {

    const [ self ]  = useSelf();


    return <div id="dashboard">

        { self &&
         <TopBar self={ self } />}

        DASHBOARD

    </div>
}
