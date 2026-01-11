const TOKEN_KEY = "token";

// set, get, remove token

export const setToken = (t) => { /* hide localStorage */
    localStorage.setItem(TOKEN_KEY, t);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};