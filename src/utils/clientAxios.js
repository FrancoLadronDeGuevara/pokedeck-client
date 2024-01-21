import axios from 'axios';

import { getLocalStorage, removeLocalStorage } from './localStorageHelper';

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

clientAxios.interceptors.request.use(
    (config) => {
        const token = getLocalStorage("token");
        if (token) {
            config.headers['access-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

clientAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                removeLocalStorage('token');
            }
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject(error.request);
        } else {
            return Promise.reject({ message: 'Error en la configuración de la solicitud' });
        }
    }
);

clientAxios.interceptors.request.use((config) => {
    return config;
});

export default clientAxios;