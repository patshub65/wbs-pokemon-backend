import z from "zod";

export const battleSchema = z.strictObject({
  pokemonId: z.coerce
    .number()
    .int()
    .min(1, { error: "pokemonId must be at least 1" })
    .max(251, { error: "pokemonId must be at most 251" }),
});
