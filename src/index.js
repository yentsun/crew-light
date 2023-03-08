import Dexie from 'dexie';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Router from './components/Router.jsx';


// init local DB, the backpack
const backpack = new Dexie('backpack');
backpack.version(1).stores({ companies: 'id', campaigns: 'id', logs: 'id', users: 'id' });

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>);

// PWA
serviceWorkerRegistration.register();

export { backpack };
