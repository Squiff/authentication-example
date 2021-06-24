import React from 'react';
import { Redirect, Route, useLocation } from 'react-router';
import { useAuth, useIsAuthenticated } from './context/auth/hooks';

function ProtectedRoute({ children, ...props }) {
    const [state] = useAuth();
    const isAuth = useIsAuthenticated();
    const location = useLocation();

    // awaiting confirmation whether user is authenticated
    if (state.loading) return <div>PROTECTED ROUTE LOADING</div>;

    return (
        <Route {...props}>
            {isAuth ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location },
                    }}
                />
            )}
        </Route>
    );
}

export default ProtectedRoute;
