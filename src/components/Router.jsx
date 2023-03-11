import { useReducer } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GlobalContext, { initialState, reducer } from '../globalContext';
import Toast from './Toast';
import ErrorBoundary from './ErrorBoundary';
import { routes } from '../dictionary';
import Login from './Login/Login';
import RequireAuth from "./RequireAuth";
import Root from "./Root/Root";
import Dashboard from "./Dashboard/Dashboard";


export default function Router() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { successMessage, errorMessage } = state;


    return (
        <GlobalContext.Provider value={{ state, dispatch }}>

            { errorMessage &&
            <Toast message={ errorMessage } type="error" /> }

            { successMessage &&
            <Toast message={ successMessage } /> }

            <ErrorBoundary>

                <BrowserRouter><Routes>

                    <Route path={ routes.root } element={ <Root /> }>

                        {/* public routes */}
                        <Route path={ routes.login } element={ <Login /> } />

                        {/* private routes */}
                        <Route path={ routes.dashboard } element={ <RequireAuth><Dashboard /></RequireAuth> }>

                        </Route>
                    </Route>

                </Routes></BrowserRouter>
            </ErrorBoundary>
        </GlobalContext.Provider>
    );
}
