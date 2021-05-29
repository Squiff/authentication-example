import React, { useState } from 'react';
import { useAuth } from '../context/auth/hooks';
import { login, logout } from '../context/auth/actions';
import { useHistory, useLocation } from 'react-router';
import * as API from '../api/api';

const initialState = {
    email: '',
    password: '',
};

function LoginForm() {
    const [state, dispatch] = useAuth();
    const [formState, setFormState] = useState(initialState);
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        // do nothing if request in flight
        if (loading) return;
        if (!formState.email) return setFormError('Email Required');
        if (!formState.password) return setFormError('Password Required');

        setFormError(''); // remove any previous fetch errors

        const redirect = redirectedFrom(location, '/');

        try {
            setLoading(true);

            const response = await API.login({
                email: formState.email,
                password: formState.password,
            });

            const { data } = response;

            dispatch(login(data));
            history.replace(redirect);
            setLoading(false);
        } catch (error) {
            setLoading(false);

            if (error.response?.data?.message) {
                return setFormError(error.response.data.message);
            }

            setFormError('There was an issue logging in');
        }
    }

    function handleChange(e) {
        const { value, name } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    }

    return (
        <div className="loginform__card">
            <h6 className="loginform__header">Login</h6>
            <div className="loginform__errortext">{formError && <div>{formError}</div>}</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="loginemail" className="loginform__label">
                    Email
                </label>
                <input
                    type="email"
                    className="loginform__input"
                    id="loginemail"
                    name="email"
                    onChange={handleChange}
                />
                <label htmlFor="loginpassword" className="loginform__label">
                    Password
                </label>
                <input
                    type="password"
                    className="loginform__input"
                    id="loginpassword"
                    name="password"
                    onChange={handleChange}
                />
                <button className="loginform__submit" onClick={handleSubmit}>
                    Sign In
                </button>
                <div className="loginform__signuptext">
                    Don't have an account? <a href="/register">Sign up now</a>
                </div>
            </form>
        </div>
    );
}

function redirectedFrom(location, defaultLocation) {
    if (location.state && location.state.from) {
        return location.state.from;
    }

    return { pathname: defaultLocation };
}

export default LoginForm;
