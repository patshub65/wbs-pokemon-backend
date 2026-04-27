type BasicStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type BattlePokemon = {
  id: number;
  name: string;
  sprite: string | null;
  stats: BasicStats;
  power: number;
  finalScore: number;
};

export type BattleTurn = {
  turn: number;
  attacker: "player" | "opponent";
  defender: "player" | "opponent";
  damage: number;
  message: string;
  playerHp: number;
  opponentHp: number;
};
