import { constants, words as w } from './dictionary';


const TOKEN_KEY = `${constants.appId}:${w.token}`;
const USER_KEY_PREFIX = `${constants}:user:`;

export function getTokenFromStorage() {
    console.debug('🔑🔎 getting token from storage');
    return localStorage.getItem(TOKEN_KEY);
}

export function clearTokenFromStorage() {
    console.debug(`🔑❌ clearing token from storage`);
    localStorage.removeItem(TOKEN_KEY);
}

export function storeToken(accessToken) {
    console.debug(`🔑💾 storing token`);
    localStorage.setItem(TOKEN_KEY, accessToken);
}

export function storeSettings(userId, settings) {
    const currentSettings = JSON.parse(localStorage.getItem(userId)) || {};
    localStorage.setItem(`${USER_KEY_PREFIX}${userId}`, JSON.stringify({ ...currentSettings, ...settings }));
}

export function getSettingsFromStorage(userId) {
    return JSON.parse(localStorage.getItem(`${USER_KEY_PREFIX}${userId}`) || '{}');
}
