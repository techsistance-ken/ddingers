// @ts-nocheck
import { writable } from 'svelte/store';
import { defaultTo, 
            append,
            insert, 
            compose, 
            prop, 
            assoc, 
            identity, 
            includes, 
            map, 
            findIndex, 
            assocPath, 
            path, 
            concat } from "ramda"
import { localStore } from './localStore.js'

const lsKey = "ddingers-seasons"




const addNewArrayToKey = (/** @type {string} */ key) => (/** @type {any} */ element)  => (/** @type {any} */ x) =>
    assoc(key, insert(-1,element)(prop(key)(x)))(x)

const addNewSeason = addNewArrayToKey("seasons");

// @ts-ignore
const createSeasonObj = compose(
  assoc("created", new Date())
)


const createSeasonId = (/** @type {readonly number[]} */ curIds) => {
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

const addGameToStore = seasonId => store => {

    console.log("KJ1", seasonId, store);
    // Find season
    const seasonIndex = findIndex(x => x.id==seasonId)(store.seasons)

    console.log("KJ2",seasonIndex)
    // To use assocPath and path -- 
    // We will look at store.seasons[seasonIndex].games
    const gamesPath = ["seasons",seasonIndex,"games"];

    const defaultToEmptyArray = defaultTo([]);

    // Get all of this found seasons games, default to empty array
    // if not found
    const seasonGames = defaultToEmptyArray(path(gamesPath)(store));
    console.log("KJ3",seasonGames)

    // This will be all the games in the season or an empty array if
    // not games exist
    const newId = createGameId(seasonGames);
    console.log("KJ4",newId)

    const newGame = {
        id: newId,
        created: new Date(),
    }

    console.log("KJ5",newGame)
    // We add this new game/id to the current games list
    const newGamesList = append(newGame,seasonGames)

    console.log("KJ6",newGamesList)
    // Now we add this games back into the store
    const newStore = assocPath(gamesPath,newGamesList)(store)

    console.log("KJ7", newStore)

    return newStore;



    
  
}
const addGame = seasonId => s => {
    const seasonIndex = findIndex(x => x.id==seasonId)(s)
    const gamesPath = [seasonIndex,"games"]
    
    const newId=createGameId(defaultTo([],path(gamesPath)));
  
  
    return assocPath(
      gamesPath,
      concat(
        defaultTo([],
                  path(gamesPath,s)
                 ),
        [{id: newId.toString() }]
      )
    )(s)
  }      

  function createSeasonsState() {
    if (typeof localStorage == 'undefined') {
        const {subscribe,set,update} = writable({seasons: []})
        return {
            subscribe,
            selectSeason: identity,
            addSeason: identity,
            addGame: identity,
        }; 
    }

	const { subscribe, set, update } = writable({
        /** @type {string} */ selectedSeason: "",
        seasons: []
    });


    const addGameFunc = seasonId => og => {



        const seasons = addGame(seasonId)(prop("seasons")(og))


        return newOg
    }

    // @ts-ignore
    update(x => localStorage.hasOwnProperty(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : x)

    const saveLS = (/** @type {any} */ data) => (localStorage.setItem(lsKey,JSON.stringify(data)),data)

	return {
		subscribe,
		selectSeason: (/** @type {string} */ selectedSeason) => update(compose(saveLS,assoc("selectedSeason",selectedSeason))),
        addSeason: (/** @type {any} */ season) => update(x => compose(saveLS,addNewSeason(createSeasonObj({name:season,id:createSeasonId(map(y=>y.id)(x.seasons))})))(x)),
        addGame: (seasonId) => update(x => compose(saveLS,addGameToStore(seasonId))(x)),
	};
}

export const seasonsStoreOg = createSeasonsState();
// export const seasonsStore = createSeasonsState();
