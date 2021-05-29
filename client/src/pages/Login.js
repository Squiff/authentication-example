import React, { useContext, useState } from 'react';
import { useAuth } from '../context/auth/hooks';
import { login, logout } from '../context/auth/actions';
import { useHistory, useLocation } from 'react-router';
import * as API from '../api/api';

function Login() {
    // const login = useLogin();
    // const logout = useLogout();
    const [state, dispatch] = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const history = useHistory();

    const handleLogin = async () => {
        if (loading) return;

        const redirect = redirectedFrom(location, '/');

        try {
            setLoading(true);

            //email: 'invalidemail@domain.com',
            const response = await API.login({
                email: 'p.n.asquith@gmail.com',
                password: '123123',
            });

            const { data } = response;

            dispatch(login(data));
            history.replace(redirect);
        } catch (error) {
            if (error.response?.data?.message) {
                return setError(error.response.data.message);
            }

            setError('There was an issue logging in');
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        if (loading) return;

        try {
            setLoading(true);
            await API.logout();
            dispatch(logout());
        } catch (error) {
            setError('There was an issue logging out');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <h5>{error}</h5>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

/* get location to redirect to after login */
function redirectedFrom(location, defaultLocation) {
    if (location.state && location.state.from) {
        return location.state.from;
    }

    return { pathname: defaultLocation };
}

export default Login;
