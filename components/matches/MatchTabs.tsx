import React from 'react';
interface MatchTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MatchTabs: React.FC<MatchTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-700 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
      <nav className="flex overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('scorecard')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'scorecard' 
              ? 'text-green-400 border-b-2 sm:border-b-3 border-green-500 bg-gray-800 shadow-lg' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          Scorecard
        </button>
        <button 
          onClick={() => setActiveTab('commentary')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'commentary' 
              ? 'text-green-400 border-b-2 sm:border-b-3 border-green-500 bg-gray-800 shadow-lg' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          Commentary
        </button>
        <button 
          onClick={() => setActiveTab('overs')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
            activeTab === 'overs' 
              ? 'text-green-400 border-b-2 sm:border-b-3 border-green-500 bg-gray-800 shadow-lg' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          Overs
        </button>
      </nav>
    </div>
  );
};