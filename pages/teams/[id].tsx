import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Team, Schedule, Result, NewsItem } from '../../utils/teams/teamTypes';
import { fetchAllTeamData } from '../../utils/teams/teamDataFetching';
import { TeamHeader } from '../../components/teams/TeamHeader';
import { TeamInfo } from '../../components/teams/TeamInfo';
import { SchedulesSection } from '../../components/teams/SchedulesSection';
import { ResultsSection } from '../../components/teams/ResultsSection';
import { NewsSection } from '../../components/teams/NewsSection';
import { TeamNotFound } from '../../components/teams/TeamNotFound';

export default function TeamDetails({ team, schedules, results, news }: {
  team: Team,
  schedules: Schedule[],
  results: Result[],
  news: NewsItem[]
}) {
  // Debug logs to see what data we're receiving
  console.log('Team data received:', team);
  console.log('Schedules data received:', schedules);
  console.log('Results data received:', results);
  console.log('News data received:', news);

  if (!team) {
    console.log('No team data found');
    return <TeamNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <TeamHeader team={team} />
        
        <TeamInfo team={team} />
        
        <SchedulesSection schedules={schedules} />
        
        <ResultsSection results={results} />
        
        <NewsSection news={news} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  console.log('Fetching team with ID:', params.id);
  
  try {
    const teamData = await fetchAllTeamData(params.id);
    
    console.log('Processed data:', {
      team: teamData.team,
      schedules: teamData.schedules,
      results: teamData.results,
      news: teamData.news
    });

    return {
      props: {
        team: teamData.team,
        schedules: teamData.schedules,
        results: teamData.results,
        news: teamData.news
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { team: null, schedules: [], results: [], news: [] } };
  }
}