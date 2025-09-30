export type RecordItem = {
  rank: string;
  playerName: string;
  country: string;
  value: string;
  against?: string;
  ground?: string;
  date?: string;
  playerId?: string;
  imageId?: string;
};

export type FilterOption = {
  value: string;
  header: string;
  category: string;
};

export type MatchType = {
  matchTypeId: string;
  matchTypeDesc: string;
};

export type Team = {
  id: string;
  teamShortName: string;
};