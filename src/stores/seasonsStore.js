import { writable } from 'svelte/store';
import { insert, compose, prop, assoc, identity } from "ramda"
import { localStore } from './localStore.js'

const lsKey = "ddingers-seasons"




const addNewArrayToKey = (/** @type {string} */ key) => (/** @type {any} */ element)  => (/** @type {any} */ x) =>
    assoc(key, insert(-1,element)(prop(key)(x)))(x)

const addNewSeason = addNewArrayToKey("seasons");


function createSeasonsState() {
    if (typeof localStorage == 'undefined') {
        const {subscribe,set,update} = writable({seasons: []})
        return {
            subscribe,
            selectSeason: identity,
            addSeason: identity
        }; 
    }

	const { subscribe, set, update } = writable({
        /** @type {string} */ selectedSeason: "",
        seasons: []
    });

    // @ts-ignore
    update(x => localStorage.hasOwnProperty(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : x)

    const saveLS = (/** @type {any} */ data) => (localStorage.setItem(lsKey,JSON.stringify(data)),data)

	return {
		subscribe,
		selectSeason: (/** @type {string} */ selectedSeason) => update(compose(saveLS,assoc("selectedSeason",selectedSeason))),
        addSeason: (/** @type {any} */ season) => update(compose(saveLS,addNewSeason(season)))
	};
}

export const seasonsStore = createSeasonsState();
