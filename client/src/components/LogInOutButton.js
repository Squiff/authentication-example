import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useIsAuthenticated } from '../context/auth/hooks';
import { logout } from '../context/auth/actions';
import * as API from '../api/api';

function LogInOutButton() {
    const [_, dispatch] = useAuth();
    const isAuth = useIsAuthenticated();

    if (!isAuth) {
        return (
            <Link to="/login" className="loginoutbutton">
                Login
            </Link>
        );
    }

    const handleLogout = async () => {
        try {
            // setLoading(true);
            await API.logout();
            dispatch(logout());
        } catch (error) {
            console.error('There was an unexpected error logging out');
        }
    };

    return (
        <button onClick={handleLogout} className="loginoutbutton">
            Log Out
        </button>
    );
}

export default LogInOutButton;
