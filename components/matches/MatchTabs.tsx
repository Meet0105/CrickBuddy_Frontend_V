import React from 'react';

interface MatchTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MatchTabs: React.FC<MatchTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-700 bg-gray-900">
      <nav className="flex">
        <button 
          onClick={() => setActiveTab('scorecard')}
          className={`px-6 py-3 text-sm font-medium transition focus:outline-none ${activeTab === 'scorecard' ? 'text-green-400 border-b-2 border-green-500 bg-gray-800' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Scorecard
        </button>
        <button 
          onClick={() => setActiveTab('commentary')}
          className={`px-6 py-3 text-sm font-medium transition focus:outline-none ${activeTab === 'commentary' ? 'text-green-400 border-b-2 border-green-500 bg-gray-800' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Commentary
        </button>
        <button 
          onClick={() => setActiveTab('overs')}
          className={`px-6 py-3 text-sm font-medium transition focus:outline-none ${activeTab === 'overs' ? 'text-green-400 border-b-2 border-green-500 bg-gray-800' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Overs
        </button>
      </nav>
    </div>
  );
};