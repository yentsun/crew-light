import Dexie from 'dexie';
import React from 'react';
import ReactDOM from 'react-dom';
import Base from './components/Base/Base.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// init local DB, the backpack
const backpack = new Dexie('backpack');
backpack.version(1).stores({ companies: 'id', campaigns: 'id', logs: 'id' });

// render Base component
ReactDOM.render(<React.StrictMode><Base /></React.StrictMode>, document.getElementById('base'));

serviceWorkerRegistration.register();
