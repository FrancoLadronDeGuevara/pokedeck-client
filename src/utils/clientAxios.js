import axios from 'axios';

import { getLocalStorage, removeLocalStorage } from './localStorageHelper';

const defaultOptions = {
    baseURL: import.meta.env.VITE_URL_BASE_API,
    headers: {
        'Content-Type': 'application/json',
        'access-token': getLocalStorage("token")
    },
};

const clientAxios = axios.create(defaultOptions);

clientAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
            removeLocalStorage('token');
        }
        return Promise.reject(error);
    }
);

clientAxios.interceptors.request.use((config) => {
    return config;
});

export default clientAxios;