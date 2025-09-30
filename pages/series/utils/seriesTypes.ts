export type Series = {
  seriesId: string;
  name: string;
  shortName: string;
  description?: string;
  startDate: string;
  endDate: string;
  seriesType: string;
  format: string;
  status: string;
  totalMatches: number;
  completedMatches: number;
  venue: {
    country: string;
    cities: string[];
  };
  teams: Array<{
    teamId: string;
    teamName: string;
    teamShortName: string;
  }>;
};

export type Match = {
  matchId: string;
  title: string;
  shortTitle: string;
  status: string;
  startDate: string;
  teams: {
    team1: {
      teamName: string;
    };
    team2: {
      teamName: string;
    };
  };
  result?: string;
};