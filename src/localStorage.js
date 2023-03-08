import { words as w } from './dictionary';


export function getTokenFromStorage() {
    return localStorage.getItem(w.token);
}

export function clearTokenFromStorage() {
    console.debug(`🔑❌ clearing token from storage`);
    localStorage.removeItem(w.token);
}

export function storeToken(accessToken) {
    console.debug(`🔑💾 storing token`);
    localStorage.setItem(w.token, accessToken);
}

export function storeSettings(userId, settings) {
    const currentSettings = JSON.parse(localStorage.getItem(userId)) || {};
    localStorage.setItem(userId, JSON.stringify({ ...currentSettings, ...settings }));
}

export function getSettingsFromStorage(userId) {
    return JSON.parse(localStorage.getItem(userId) || '{}');
}
