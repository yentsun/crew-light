import '@fontsource/dm-mono';
import React from 'react';
import useSelf from '../../hooks/useSelf';
import TopBar from '../TopBar';
import './dashboard.css';


export default function Dashboard() {

    useSelf();


    return <div id="dashboard">

        <TopBar />

        DASHBOARD

    </div>
}
