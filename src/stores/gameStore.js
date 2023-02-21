import { writable } from 'svelte/store'
import { localStore } from './localStore.js'

export const gameId = writable('1234')

const initialGames = {
	games: []
};

export const initialGame = {
	opponents: [],
	players: [],
	batters: [],
	startingPitcher: "",
	pitcherInnings: [],
	atBats: [],
}

export const games = localStore('games', initialGames)
