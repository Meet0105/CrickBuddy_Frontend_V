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
    <div className="border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-20">
      <nav className="flex overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'matches'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => handleTabChange('schedule')}
          className={`flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'schedule'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => handleTabChange('squads')}
          className={`flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'squads'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Squads
        </button>
        <button
          onClick={() => handleTabChange('venues')}
          className={`flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'venues'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Venues
        </button>
        <button
          onClick={() => handleTabChange('points')}
          className={`flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'points'
              ? 'text-green-400 border-b-2 border-green-500 bg-gray-800'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Points Table
        </button>
        <button
          onClick={() => handleTabChange('stats')}
          className={`flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none whitespace-nowrap ${
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