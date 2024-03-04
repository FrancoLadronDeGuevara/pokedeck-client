import axios from 'axios';
import Cookies from 'js-cookie';

const clientAxios = axios.create({
    baseURL: "https://pockedeck-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

clientAxios.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
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