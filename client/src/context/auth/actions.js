import { ACTIONS } from './reducer';

export function login(user) {
    return { type: ACTIONS.login, payload: user };
}

export function logout() {
    return { type: ACTIONS.logout };
}

export function setError(msg) {
    return { type: ACTIONS.error, payload: msg };
}
