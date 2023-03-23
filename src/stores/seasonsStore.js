// @ts-nocheck
import { writable } from 'svelte/store';
import { collection, query, getDocs, setDoc, addDoc, db} from '../firebase.js'
import { 
            append,
            compose, 
            prop, 
            assoc, 
            length,
            has} from "ramda"
import { userStore } from './userStore';

          

const setupSeasonsStore = () => {
    const { subscribe, set, update } = writable({state: "loading"})
    return {
        set,
        update,
        subscribe,
        loadSeasons: async (uid) => {

            // Query for All seasions for this User
            const first = query(collection(db, `mlb23/seasons/${uid}`));

            // Get the documents and set err if there is an issue
            const documentSnapshots = await getDocs(first).catch(e => ({err: e, exists: () => false}));

            // If we made an object with err atribute, then update the state and exit
            if(has("err",documentSnapshots)) {
                console.log("err",prop("err",documentSnapshots))
                update(compose(assoc("message",documentSnapshots.err),assoc("state","fail")))
                return;
            }

            /**
             * @type {import("@firebase/firestore").DocumentData[]}
             */
            let docs = [];

            // At this point if documentSnapshots was not valid, we would have exitted
            documentSnapshots.forEach((doc) => {
                // We are adding the ID to the season object
                docs.push(assoc("id",doc.id,doc.data()));
            });
    
            // If we don't have any seasons we update the state
            const newState = length(docs) == 0 ? "no_seasons" : "ready"
    
            // update the store to set the state and the seasons we retrieved
            update(compose(assoc("state",newState),assoc("seasons",docs)))
        },
        saveSeason: async (seasonName,mode, uid) => {
            update(assoc("seasonState","saving"))
            const c = collection(db,`mlb23/seasons/${uid}`);
            // const c = collection(db,`mlb23/seasons/12a`);
            if(has("err",c)) {
                update(compose(assoc("message",prop("err",doc)),assoc("seasonState","fail")))
            }
            const newSeason = {name: seasonName, defaultMode: mode, games: []}
            const doc = await addDoc(c,newSeason).catch(e => ({err: e}))
            if(!has("err",doc)) {
                update(x => {
                    const ogSeasons = prop("seasons",x);
                    const newSeasons = append(newSeason)(ogSeasons)
                    return compose(
                        assoc("seasons",newSeasons),
                        assoc("seasonState","added")
                    )(x)
                })
            }
            else {
                update(compose(assoc("message",prop("err",doc)),assoc("seasonState","fail")))
            }

        }
    } 
}
export const seasonStore = setupSeasonsStore()


  