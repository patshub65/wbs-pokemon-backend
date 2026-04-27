import { fetchPokemon, getRandomPokemonId } from "#utils";
import type { RequestHandler } from "express";

export const battle: RequestHandler = async (req, res, next) => {
  /**
   Validate pokemonId and fetch it from the API
   */
  try {
    const userPokemonId = req.body.pokemonId;
    if (!userPokemonId)
      throw new Error("Select a proper Pokemon", { cause: { status: 400 } });

    /**Generate random enemy ID between 1 and 251 and fetch it*/
    const randomEnemyId = getRandomPokemonId(userPokemonId);

    const [userPokemon, randomPokemon] = await Promise.all([
      fetchPokemon(userPokemonId),
      fetchPokemon(randomEnemyId),
    ]);

    /**Extract basic stats*/

    /**
    Calculate battle score for both
    Decide winner
    Update playerStats in MongoDB
    Return battle result
    */
  } catch (error) {
    next(error);
  }
};
