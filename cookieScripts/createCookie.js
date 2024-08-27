export default function setCookie(name) {
    const expires = new Date(Date.now() + 10e9 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}