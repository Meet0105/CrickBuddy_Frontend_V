import React from 'react';

interface SeriesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSeriesData: (data: any) => void;
}

export const SeriesTabs: React.FC<SeriesTabsProps> = ({ activeTab, setActiveTab, setSeriesData }) => {
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSeriesData(null);
  };

  return (
    <div className="border-b border-gray-700 bg-gray-900">
      <nav className="flex">
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-4 py-3 text-sm font-medium transition focus:outline-none ${
            activeTab === 'matches'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => handleTabChange('schedule')}
          className={`px-4 py-3 text-sm font-medium transition focus:outline-none ${
            activeTab === 'schedule'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => handleTabChange('squads')}
          className={`px-4 py-3 text-sm font-medium transition focus:outline-none ${
            activeTab === 'squads'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Squads
        </button>
        <button
          onClick={() => handleTabChange('venues')}
          className={`px-4 py-3 text-sm font-medium transition focus:outline-none ${
            activeTab === 'venues'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Venues
        </button>
        <button
          onClick={() => handleTabChange('points')}
          className={`px-4 py-3 text-sm font-medium transition focus:outline-none ${
            activeTab === 'points'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Points Table
        </button>
        <button
          onClick={() => handleTabChange('stats')}
          className={`px-4 py-3 text-sm font-medium transition focus:outline-none ${
            activeTab === 'stats'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Stats
        </button>
      </nav>
    </div>
  );
};