import fetchCookies from "../cookieScripts/fetchCookie";

export default function tickerSearchFetch() {
    try {
        const apiKey = fetchCookies('apiKey');
        if (!apiKey) {
            // If the API key doesn't exist, redirect to APIKey_insert.html
            window.location.href = 'APIKey_insert.html';
        } else {
            console.log('API Key exists:', apiKey);
            // Add further logic here to use the API key
        }
    } catch (error) {
        console.error('An error occurred:', error);
        // Optionally handle the error or redirect to a different page
        window.location.href = 'APIKey_insert.html';
    }
}
