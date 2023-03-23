/** @type {import('./$types').PageLoad} */
import { find, has, prop } from 'ramda';
import { seasonsStore } from '../../../../../stores/seasonsStore';
import { playersStore } from '../../../../../stores/playersStore';

import { get } from 'svelte/store';
import { gameStore } from '../../../../../stores/gameStore';

export async function load({ params }) {

    const storeV = get(seasonsStore);
    const season = find(x => x.id == params.id)(storeV.seasons)
    const games = has("games",season) ? prop("games",season) : []
    const game = find(x => x.id == params.gameId)(games)

    const playersS = get(playersStore)
    /**
     * @type {any[]}
     */
    const players = playersS.players


    return {
      seasonId: params.id,
      season: season,
      gameId: params.gameId,
      game: game,
      players
    };
  }