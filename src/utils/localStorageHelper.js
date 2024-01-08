export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return localStorage.getItem(key);
    }
};

export const removeLocalStorage = (key) => {
    return localStorage.removeItem(key);
};

export const removeAllLocalStorage = () => {
    return localStorage.clear();
};
