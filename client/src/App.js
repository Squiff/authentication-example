import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthContextProvider } from './context/auth/context';

function app() {
    return (
        <AuthContextProvider>
            <Router>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">Profile</Link>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <ProtectedRoute path="/profile">
                        <Profile />
                    </ProtectedRoute>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default app;
