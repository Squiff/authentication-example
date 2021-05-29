import { createContext, useContext, useEffect, useReducer } from 'react';
import { authReducer } from './reducer';
import { profile } from '../../api/api';
import { login, error } from './actions';

export const AuthContext = createContext();

const initialState = {
    user: {}, // user profile info
    loading: true, // loading status for inital on mount check
    error: '', // any auth error during sign in and logout
};

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // attempt to re-initialize user on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await profile();
                const { data } = response;
                dispatch(login(data));
            } catch (error) {
                if (error.response && error.response.status === 401) return;

                dispatch(error(error.message));
            }
        };

        fetchUser();
    }, []);

    return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
}
