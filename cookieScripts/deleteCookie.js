export default function deleteCookies(...names) {
    const pastDate = new Date(0).toUTCString();
    
    names.forEach(name => {
        document.cookie = `${name}=; expires=${pastDate}; path=/`;
    });
}


// Example usage
// deleteCookies('cookie1', 'cookie2');