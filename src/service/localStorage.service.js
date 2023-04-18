const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const TYPE_KEY = "type-key"

export function setTokens({
    token,
    type,
    id,
    refresh_token,
    expiresIn = 3540,
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, id);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TYPE_KEY, type);
    localStorage.setItem(REFRESH_KEY, refresh_token);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function removeTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TYPE_KEY);
}

export function getAcessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function getTypeKey() {
    return localStorage.getItem(TYPE_KEY);
}

export function getRefreshKey() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresKey() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAcessToken,
    getUserId,
    getTypeKey,
    getRefreshKey,
    getExpiresKey,
    removeTokens,
};



export default localStorageService;