import React, { useContext, useState } from 'react';
import { useAuth } from '../context/auth/hooks';
import { login, logout } from '../context/auth/actions';
import { useHistory, useLocation } from 'react-router';
import * as API from '../api/api';
import LoginForm from '../components/LoginForm';

function Login() {
    return (
        <div>
            <LoginForm />
        </div>
    );
}

export default Login;
