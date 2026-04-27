import type { BattlePokemon } from "#types";

export const getRandomPokemonId = (excludedId: number) => {
  let randomId = excludedId;

  while (randomId === excludedId) {
    randomId = Math.floor(Math.random() * 251) + 1;
  }

  return randomId;
};

export const fetchPokemon = async (pokemonId: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon data", {
      cause: { status: res.status },
    });
  }

  return await res.json();
};

const getStat = (pokemon: any, statName: string) => {
  const stat = pokemon.stats.find((s: any) => s.stat.name === statName);

  return stat?.base_stat ?? 0;
};

const mapPokemon = (
  pokemon: any,
): Omit<BattlePokemon, "power" | "finalScore"> => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite:
      pokemon.sprites.other["official-artwork"].front_default ??
      pokemon.sprites.front_default,
    stats: {
      hp: getStat(pokemon, "hp"),
      attack: getStat(pokemon, "attack"),
      defense: getStat(pokemon, "defense"),
      specialAttack: getStat(pokemon, "special-attack"),
      specialDefense: getStat(pokemon, "special-defense"),
      speed: getStat(pokemon, "speed"),
    },
  };
};
