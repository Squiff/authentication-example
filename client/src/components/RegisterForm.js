import React, { useState } from 'react';
import { useAuth } from '../context/auth/hooks';
import { login, logout } from '../context/auth/actions';
import { useHistory, useLocation } from 'react-router';
import * as API from '../api/api';

const initialState = {
    email: '',
    password: '',
    confirmpassword: '',
};

function RegisterForm() {
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
        if (!formState.confirmpassword) return setFormError('Please confirm password');
        if (formState.password !== formState.confirmpassword)
            return setFormError('Passwords do not match');

        setFormError(''); // remove any previous fetch errors

        const redirect = redirectedFrom(location, '/');

        try {
            setLoading(true);

            const response = await API.register({
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

            setFormError('There was an issue during sign up. Please try again later.');
        }
    }

    function handleChange(e) {
        const { value, name } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    }

    return (
        <div className="loginform__card">
            <h6 className="loginform__header">Sign Up</h6>
            <div className="loginform__errortext">{formError && <div>{formError}</div>}</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="registeremail" className="loginform__label">
                    Email
                </label>
                <input
                    type="email"
                    className="loginform__input"
                    id="registeremail"
                    name="email"
                    onChange={handleChange}
                />
                <label htmlFor="registerpassword" className="loginform__label">
                    Password
                </label>
                <input
                    type="password"
                    className="loginform__input"
                    id="registerpassword"
                    name="password"
                    onChange={handleChange}
                />
                <label htmlFor="registerpasswordconfirm" className="loginform__label">
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="loginform__input"
                    id="registerpasswordconfirm"
                    name="confirmpassword"
                    onChange={handleChange}
                />
                <button className="loginform__submit" onClick={handleSubmit}>
                    Sign Up
                </button>
                <div className="loginform__signuptext">
                    Already have an account? <a href="/login">Login</a>
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

export default RegisterForm;
