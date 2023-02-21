import { writable } from 'svelte/store';
import { compose, without, assoc, identity } from "ramda"
import { localStore } from './localStore.js'

const lsKey = "playerList6"




function createPlayerManagementState() {
    if (typeof localStorage == 'undefined') {
        const {subscribe,set,update} = writable({})
        return {
            subscribe,
            selectPlayer: identity
        }; 
    }

	const { subscribe, set, update } = writable({
        pathFrom: "",
        pathReturn: "",
        /** @type {string} */ selectedPlayer: "",
        players: []
    });

    // @ts-ignore
    update(x => localStorage.hasOwnProperty(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : x)

    const saveLS = (/** @type {any} */ data) => (localStorage.setItem(lsKey,JSON.stringify(data)),data)

	return {
		subscribe,
		selectPlayer: (/** @type {string} */ selectedPlayer) => update(compose(saveLS,assoc("selectedPlayer",selectedPlayer)))
	};
}

export const playerManagementStore = createPlayerManagementState();
