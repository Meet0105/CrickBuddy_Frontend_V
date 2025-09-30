export type Team = {
  teamId: string;
  name: string;
  country?: string;
  flagImage?: {
    url: string;
    alt: string;
  };
  players?: any[];
  raw?: any;
  imageId?: string;
};

export type Schedule = {
  matchId: string;
  title: string;
  date: string;
  venue: string;
  status: string;
};

export type Result = {
  matchId: string;
  title: string;
  date: string;
  venue: string;
  result: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

export type Player = {
  playerId?: string;
  id?: string;
  name?: string;
  fullName?: string;
  role?: string;
  position?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  imageId?: string;
};