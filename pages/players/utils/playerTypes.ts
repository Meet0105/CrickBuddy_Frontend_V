export type Player = {
  playerId: string;
  name: string;
  role: string;
  country: string;
  stats?: any;
  raw?: any;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

export type CareerStat = {
  format: string;
  debut: string;
  lastPlayed: string;
  matches?: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
};

export type BattingStat = {
  format: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  centuries: number;
  fifties: number;
  highest: number;
};

export type BowlingStat = {
  format: string;
  matches: number;
  wickets: number;
  average: number;
  economy: number;
  best: string;
};

export type PlayerRanking = {
  position: string;
  rating: string;
};

export type PlayerRankings = {
  testBatsmen?: PlayerRanking;
  odiBatsmen?: PlayerRanking;
  t20Batsmen?: PlayerRanking;
  testBowlers?: PlayerRanking;
  odiBowlers?: PlayerRanking;
  t20Bowlers?: PlayerRanking;
};