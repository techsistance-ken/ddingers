import { all, any, assoc, clone, compose, identity, includes, isEmpty, isNil, prop } from 'ramda';
import { writable } from 'svelte/store'
import { localStore } from './localStore.js'


let lsKey = "ddingers-s/"

export const initialGame = {
	opponents: [],
	result: {
			result: "",
			ratingBefore: 0,
			ratingAfter: 0,
			oppRatingBefore: 0,
			oppRatingAfter: 0
	},
	gameType:   { id: "solo_ranked", display: "Solo Ranked"},
	captain: null,
	player2: null,
	player3: null,
	batters: [],
	startingPitcher: "",
	pitcherInnings: [],
	atBats: [],
	seasonId: null,
	gameId: null 
}

const nilOrEmpty = x => isNil(x) || isEmpty(x)

const createGameId = (/** @type {readonly number[]} */ curIds) => {
    let i=0;
    let k=0;

    while(i < 1000)
    {
        const array = new Uint32Array(1);
        self.crypto.getRandomValues(array);

        if(includes(array[0])(curIds))
          i++;
        else  {
          k=array[0];
          i=1001;
        }
    }

    return k;

}

const createNewGame = () => {

}

function createGameState() {
	// for when it runs on server --
	// not 100% sure why this happens yet
    if (typeof localStorage == 'undefined') {
        const {subscribe,set,update} = writable(initialGame)

        return {
            subscribe,
			setup: identity,
            getPlayers: identity,
            savePlayers: identity,
			saveOpponents: identity,
			saveResults: identity,
            setGameMode: identity,
        }; 
    }

	const { subscribe, set, update } = writable(initialGame);

	const savePlayers = (captain, player2, player3) => ogData => {
		ogData.captain=captain
		ogData.player2=player2
		ogData.player3=player3

		return ogData;
	}

	const saveOpponents = (opponents) => ogData => {
		return assoc("opponents",opponents)(ogData);
	}

	const setup = (seasonId, gameId) => {
	    // @ts-ignore
		update(data => {
			// if(any(nilOrEmpty)([prop("seasonId",data),prop("gameId",data)])) return data;


			lsKey = `ddingers-s-${seasonId}-g-${gameId}`

			console.log("data.seasonId",data.seasonId)
			console.log("data.gameId",data.gameId)
			console.log("gameId",gameId)
			console.log("seasonId", seasonId)
			if(seasonId != data.seasonId || gameId != data.gameId) {
				console.log("Game Setup 222")
				data = clone(initialGame)
			}

			data.seasonId = seasonId;
			data.gameId = gameId;
			data.id = gameId;

	
			console.log("Game Setup3",localStorage.hasOwnProperty(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : data)
			// @ts-ignore
			return localStorage.hasOwnProperty(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : data
		});
}

	
    const saveLS = (/** @type {any} */ data) => {
		if(any(nilOrEmpty)([prop("seasonId",data),prop("gameId",data)])) return data;

		localStorage.setItem(lsKey,JSON.stringify(data))

		return data;
	}

	return {
		subscribe,
		setup: (seasonId,gameId) => setup(seasonId,gameId),
		selectSeason: (/** @type {string} */ selectedSeason) => update(compose(saveLS,assoc("selectedSeason",selectedSeason))),
        getPlayers: identity,
		saveResults: (results) => update(compose(saveLS,assoc("result",results))),
		savePlayers: (captain, player2, player3) => update(compose(saveLS,savePlayers(captain,player2,player3))),
		saveOpponents: (opponents) => update(compose(saveLS,saveOpponents(opponents))),
		setGameMode: (/** @type {string} */ gameModeId) => update(x => compose(saveLS,assoc("gameMode",gameModeId))(x)),
	};
}

export const gameStore = createGameState();