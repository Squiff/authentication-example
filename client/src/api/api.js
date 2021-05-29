import axios from 'axios';

const api_base_url = '/api';

const API = axios.create({ baseURL: api_base_url });

export const login = ({ email, password }) => API.post('/login', { email, password });
export const register = ({ email, password }) => API.post('/register', { email, password });
export const logout = () => API.post('/logout');
export const profile = () => API.get('/profile');
