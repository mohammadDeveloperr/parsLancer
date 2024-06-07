// Utility function to check if an item is expired
function isItemExpired(expiration) {
    return Date.now() > expiration;
}

// Function to get session data with expiration check
function getSession(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null; // No item found
    }

    const item = JSON.parse(itemStr);
    if (isItemExpired(item.expiration)) {
        localStorage.removeItem(key); // Remove expired item
        return null; // Session expired
    }

    return item.value; // Return session data
}

// Function to clear session data
function clearSession(key) {
    localStorage.removeItem(key);
}

function setSession(key, value, expiresInMinutes) {
    const expiration = Date.now() + expiresInMinutes * 60 * 1000; // Calculate expiration timestamp
    const item = {
      value,
      expiration
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

export {getSession,clearSession,setSession}