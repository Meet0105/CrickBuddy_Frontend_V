export type TeamRanking = {
  position: number;
  teamName: string;
  rating: number;
  points: number;
};

export type PlayerRanking = {
  position: number;
  playerName: string;
  country: string;
  rating: number;
  points?: number;
  matches?: number;
  runs?: number;
  wickets?: number;
};