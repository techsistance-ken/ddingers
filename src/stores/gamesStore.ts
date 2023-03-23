import { filter, includes, length } from 'ramda';
import { writable } from 'svelte/store'
import type { Game, Games } from '../types/game'

const _gamesStore = writable<Games>({games: []});

const createGameId = (curIds: string[]): string  =>  {
    let i=0;
    let k="";

    while(i < 1000)
    {
        const array = new Uint32Array(1);
        self.crypto.getRandomValues(array);

        if(includes(array[0].toString())(curIds))
          i++;
        else  {
          k=array[0].toString();
          i=1001;
        }
    }

    return k;

}
export const gamesStore = {
    subscribe: _gamesStore.subscribe,
    update: _gamesStore.update,
    set: _gamesStore.set,
    addNewGame: (seasonId: string) => _gamesStore.update((ogData: Games) => {

        // Get Season Games
        const seasonGames = filter((x: Game) => x.seasonId == seasonId)(ogData.games)

        length(seasonGames) > 0 ? 1 : 0;





        return ogData
    })
}