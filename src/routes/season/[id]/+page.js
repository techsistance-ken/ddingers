/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return {
      seasonId: params.id,
    };
  }