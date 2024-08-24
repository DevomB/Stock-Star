// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict; Secure`;
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Function to delete a cookie
function deleteCookie(name) {
    setCookie(name, '', -1); // Set cookie expiration to a past date to delete it
}

// Function to set the "Terms of Use Agreement Status" cookie
function setTermsOfUseAgreementStatus(accepted) {
    setCookie('terms_of_use_agreement_status', accepted ? 'accepted' : 'declined', 365); // Store acceptance state for 1 year
}

setTermsOfUseAgreementStatus(true); // Set "Terms of Use Agreement Status" cookie as accepted

// Export functions for use in other scripts
export { setCookie, getCookie, deleteCookie, setGoogleCookies, setTermsOfUseAgreementStatus };
