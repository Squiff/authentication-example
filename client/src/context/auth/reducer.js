export const ACTIONS = {
    login: 'LOGIN',
    logout: 'LOGOUT',
    error: 'ERROR',
};

export function authReducer(state, action) {
    switch (action.type) {
        case ACTIONS.login:
            return { ...state, user: { ...action.payload }, loading: false };
        case ACTIONS.logout:
            return { ...state, user: {} };
        case ACTIONS.error:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}
