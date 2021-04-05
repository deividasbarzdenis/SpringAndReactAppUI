import axios from 'axios';
import { API_URL } from './config';

export const signup = (user) => {
    return axios.post('/api/1.0/users', user);
}
export const login = (user) => {
    return axios.post('/api/1.0/login', {}, {auth: user})
}

export const loginFacebook = (user) => {
    console.log("apiCalls - loginFacebook - user: ", user);

    return axios.post(`${API_URL}/oauth2/facebook`, user);
};