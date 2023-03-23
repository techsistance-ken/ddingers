// @ts-nocheck
import { writable } from 'svelte/store';
import { collection, getDoc, addDoc, doc, db} from '../firebase.js'
import { 
            append,
            compose, 
            prop, 
            assoc, 
            length,
            has,
            mergeLeft} from "ramda"

const setupSeasonDetailStore = () => {
    const { subscribe, set, update } = writable({state: "loading"})
    return {
        set,
        update,
        subscribe,
        addGame: async (uid,seasonId,mode) => {
            update(assoc("newGameState","saving"))
            const gamesCollection = collection(db,`mlb23/seasons/${uid}/${seasonId}/games`);
            // const c = collection(db,`mlb23/seasons/12a`);
            if(has("err",gamesCollection)) {
                update(compose(assoc("message",prop("err",doc)),assoc("newGameState","fail")))
            }
            const newGame = {gameMode: mode, opponents: [], players: [], lineup: [], ratings: {}, result: "not_finished", atBats: []}
            const doc = await addDoc(gamesCollection,newGame).catch(e => ({err: e}))
            if(!has("err",doc)) {
                update(x => {
                    const ogGames = prop("games",x);
                    const newGames = append(newGame)(ogGames)
                    return compose(
                        assoc("games",newGames),
                        assoc("newGameState","added")
                    )(x)
                })
            }
            else {
                update(compose(assoc("message",prop("err",doc)),assoc("newGameState","fail")))
            }

        },
        loadGames: async (uid,seasonId) => {
            
        }
        loadSeason: async (uid,seasonId) => {

            const seasonDocRef = doc(db, `mlb23/seasons/${uid}/${seasonId}`);
            const seasonDocSnapshot = await getDoc(seasonDocRef);

            ////// GAMES: GET FROM COLLECTION
            if(seasonDocSnapshot.exists()) {
                const d = seasonDocSnapshot.data();
                // We save D to be seasonDetail Store by merging the data we get back
                // and then add state ready so the page knows to show it.
                update(compose(assoc("state","ready"),mergeLeft(d)))
                console.log("data",seasonDocSnapshot.data())
            }
            else {
                console.log("No Doc")
                return;
            }
            

        },
    } 
}
export const seasonDetailStore = setupSeasonDetailStore()


  