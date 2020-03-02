import { writable } from 'svelte/store';


// Our game
const game = {
    'id': null,
    'players': []
};

// Export store
export const gameStore = writable(game);
