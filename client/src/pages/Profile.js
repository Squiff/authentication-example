import React from 'react';
import Container from '../components/Container';
import { useAuth } from '../context/auth/hooks';

function Profile() {
    const [state] = useAuth();

    return (
        <Container>
            <h1>Profile for {state.user?.email}</h1>
            <p>
                This is the profile page. Accessing this page without being logged in will return a
                401 and redirect to the login page.
            </p>
            <p> After a successful login you will be directed back to this page.</p>
            <p>Logging out will direct to the login page</p>
        </Container>
    );
}

export default Profile;
