import { writable } from 'svelte/store';
import { insert, compose, prop, assoc, identity, includes, map, findIndex, assocPath, propEq, defaultTo, remove } from "ramda"
import { localStore } from './localStore.js'

const lsKey = "ddingers-players"




const addNewArrayToKey = (/** @type {string} */ key) => (/** @type {any} */ element)  => (/** @type {any} */ x) =>
    assoc(key, insert(-1,element)(prop(key)(x)))(x)

const addNewPlayer = addNewArrayToKey("players");

// @ts-ignore
const createPlayerObj = compose(
  assoc("created", new Date())
)


const createPlayerId = (/** @type {readonly number[]} */ curIds) => {
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

const defaultPlayersStore = defaultTo({
    players: []
})

function createPlayersState() {
    if (typeof localStorage == 'undefined') {
        const {subscribe,set,update} = writable({players: []})
        return {
            subscribe,
            selectPlayer: identity,
            updatePlayer: identity,
            deletePlayer: identity,
            addPlayer: identity
        }; 
    }

	const { subscribe, set, update } = writable({
        /** @type {string} */ selectedPlayer: "",
        players: []
    });

    // @ts-ignore
    update(x => localStorage.hasOwnProperty(lsKey) ? defaultPlayersStore(JSON.parse(localStorage.getItem(lsKey))) : defaultPlayersStore(x))

    const saveLS = (/** @type {any} */ data) => (localStorage.setItem(lsKey,JSON.stringify(data)),data)

	return {
		subscribe,
		selectPlayer: (/** @type {string} */ selectedPlayer) => update(compose(saveLS,assoc("selectedPlayer",selectedPlayer))),
        deletePlayer: (/** @type {string} */ playerId) => {
            update(x => { 
                const index = findIndex(propEq("id",playerId))(x.players)
                return compose(
                    compose(
                    saveLS,
                    y => assoc("players",y)(x)
                    ),
                    remove(index,1),
                    )(x.players);
                })
        }, 
        updatePlayer: (/** @type {string} */ playerId, playerName, tag, color)  => 
            // @ts-ignore
            update(x => {
                    const index = findIndex(propEq("id",playerId))(x.players)
                    return compose(
                        compose(
                          saveLS,
                          y => assoc("players",y)(x)
                        ),
                        assocPath([index,"name"],playerName),
                        assocPath([index,"tag"],tag),
                        assocPath([index,"color"],color)
                    )(x.players)
                }
            ),
        addPlayer: (/** @type {any} */ playerName,/** @type {any} */ tag, /** @type {any} */ color) => 
            update(x => 
                compose(
                    saveLS,
                    addNewPlayer(
                        createPlayerObj(
                            {name:playerName, tag: tag, color: color,id:createPlayerId(map(y=>y.id)(x.players))}
                        )
                    )
                )(x))
	};
}

export const playersStore = createPlayersState();
