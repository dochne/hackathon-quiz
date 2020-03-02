import { writable } from 'svelte/store';

const settingsVersion = 2;

// ID generator
function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Default user props
const userDefaults = {
    'id': makeId(32),
    'name': '',
    'color': '',
    'image': '',
    'configured': false,
    'settingsVersion': settingsVersion
};

// Get from local storage
const localStorageData = JSON.parse(localStorage.getItem("user"));

// Check if we have user details and they're the current version, otherwise use defaults
const userDetails = (localStorageData && localStorageData.settingsVersion >= settingsVersion) ? localStorageData : userDefaults;

// Export store
export const user = writable(userDetails);

// When our user changes, save to local storage
user.subscribe(val => localStorage.setItem("user", JSON.stringify(val)));
