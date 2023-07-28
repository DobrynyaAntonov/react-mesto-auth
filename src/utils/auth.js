export const BASE_URL = "https://api.mesto.dobrynya.nomoredomains.xyz";

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
};

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then(getResponseData);
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        }),
    })
        .then(getResponseData);
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(getResponseData);
};

export const deleteCookie = () => {
    return fetch(`${BASE_URL}/loginout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(getResponseData);
};
