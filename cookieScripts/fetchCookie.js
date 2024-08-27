export default function fetchCookies(...names) {
    const cookies = {};
    names.forEach(name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) cookies[name] = parts.pop().split(';').shift();
        else cookies[name] = null; // Return null if the cookie is not found
    });
    return cookies;
}

/*
const cookieNames = ['cookie1', 'cookie2', 'cookie3']; // Replace with the names of your cookies
const cookies = getCookies(...cookieNames);
*/