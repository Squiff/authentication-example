import React from 'react';
import { useAuth } from '../context/auth/hooks';

function Profile() {
    const [state] = useAuth();

    return (
        <div>
            <h1>This is a profile page</h1>
            <div>Email: {state.user?.email}</div>
        </div>
    );
}

export default Profile;
