import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthContextProvider } from './context/auth/context';
import Navbar from './components/Navbar';
import Register from './pages/Register';

function app() {
    return (
        <AuthContextProvider>
            <Router>
                <Navbar>sdgfdfzg</Navbar>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
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
