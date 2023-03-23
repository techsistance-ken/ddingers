import { writable } from "svelte/store";
import { auth, onAuthStateChanged } from "../firebase.js"




const createUserStore = () => {


	const { subscribe, set, update } = writable({});

    onAuthStateChanged(auth, (user) => {
        console.log("State Changed")
        if(user) {
            console.log("Setting User: ",user.email)
            set({
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
                email: user.email
            })
        }
        else {
            set({});
        }
    })

    return {
        subscribe,
        set,
        update,
    }

}


export const userStore = createUserStore();





