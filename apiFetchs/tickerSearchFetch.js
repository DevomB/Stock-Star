// Import the necessary Chrome API modules
// Chrome extensions don't use ES modules, so you'll place this script in your extension's background or popup script.

export default function tickerSearchFetch() {
    try {
        // Fetch the API key using the chrome.cookies API
        chrome.cookies.get({url: 'http://your-extension-id', name: 'api_key'}, function(cookie) {
            if (!cookie) {
                // If the API key doesn't exist, redirect to APIKey_insert.html
                chrome.tabs.update({url: chrome.runtime.getURL('APIKey_insert.html')});
            } else {
                const api_key = cookie.value;
                console.log('API Key exists:', api_key);
                // Add further logic here to use the API key
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
        // Optionally handle the error or redirect to a different page
        chrome.tabs.update({url: chrome.runtime.getURL('APIKey_insert.html')});
    }
}

function tickerResponseParser(data) {
    const bestMatches = data.bestMatches;

    const firstThreeNames = bestMatches.slice(0, 3).map(match => match["1. symbol"]);
    
    return firstThreeNames; //Return type is String[]
}
