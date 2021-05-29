import { useContext } from 'react';
import { AuthContext } from './context';

/* access auth info. returns [state, dispatch] */
export function useAuth() {
    return useContext(AuthContext);
}

/** check whether user is logged in */
export function useIsAuthenticated() {
    const [state, dispatch] = useAuth();

    return !!state.user.email;
}
