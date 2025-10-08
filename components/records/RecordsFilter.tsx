import React from 'react';
import { FilterOption } from '../../utils/records/recordsTypes';

interface RecordsFilterProps {
  filters: FilterOption[];
  selectedStatsType: string;
  selectedMatchType: string;
  selectedTeam: string;
}

export const RecordsFilter: React.FC<RecordsFilterProps> = ({ 
  filters, 
  selectedStatsType, 
  selectedMatchType, 
  selectedTeam 
}) => {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 lg:p-7 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-4 sm:mb-5 md:mb-6">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-400">Filter Records</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">Stats Type</label>
          <select 
            className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-700/80 border border-gray-600/50 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:bg-gray-700"
            value={selectedStatsType}
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('statsType', e.target.value);
              window.location.href = url.toString();
            }}
          >
            <optgroup label="Batting Records" className="bg-gray-800 text-green-400">
              {filters.filter(f => f.category === 'Batting').map((filter) => (
                <option key={filter.value} value={filter.value} className="bg-gray-700 text-gray-200">
                  {filter.header}
                </option>
              ))}
            </optgroup>
            <optgroup label="Bowling Records" className="bg-gray-800 text-green-400">
              {filters.filter(f => f.category === 'Bowling').map((filter) => (
                <option key={filter.value} value={filter.value} className="bg-gray-700 text-gray-200">
                  {filter.header}
                </option>
              ))}
            </optgroup>
            {filters.filter(f => !f.category || (f.category !== 'Batting' && f.category !== 'Bowling')).map((filter) => (
              <option key={filter.value} value={filter.value} className="bg-gray-700 text-gray-200">
                {filter.header}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">Match Type</label>
          <select 
            className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-700/80 border border-gray-600/50 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:bg-gray-700"
            value={selectedMatchType}
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('matchType', e.target.value);
              window.location.href = url.toString();
            }}
          >
            <option value="1" className="bg-gray-700 text-gray-200">🏏 Test Cricket</option>
            <option value="2" className="bg-gray-700 text-gray-200">🏆 ODI Cricket</option>
            <option value="3" className="bg-gray-700 text-gray-200">⚡ T20 Cricket</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">Team Filter</label>
          <select 
            className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-700/80 border border-gray-600/50 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:bg-gray-700"
            value={selectedTeam}
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('teamId', e.target.value);
              window.location.href = url.toString();
            }}
          >
            <option value="" className="bg-gray-700 text-gray-200">🌍 All Teams</option>
            <optgroup label="Test Playing Nations" className="bg-gray-800 text-green-400">
              <option value="172117" className="bg-gray-700 text-gray-200">🇦🇺 Australia</option>
              <option value="719031" className="bg-gray-700 text-gray-200">🇮🇳 India</option>
              <option value="172113" className="bg-gray-700 text-gray-200">🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</option>
              <option value="172115" className="bg-gray-700 text-gray-200">🇳🇿 New Zealand</option>
              <option value="172121" className="bg-gray-700 text-gray-200">🇵🇰 Pakistan</option>
              <option value="172123" className="bg-gray-700 text-gray-200">🇿🇦 South Africa</option>
              <option value="172119" className="bg-gray-700 text-gray-200">🇱🇰 Sri Lanka</option>
              <option value="172125" className="bg-gray-700 text-gray-200">🏴󠁧󠁢󠁥󠁮󠁧󠁿 West Indies</option>
              <option value="172127" className="bg-gray-700 text-gray-200">🇧🇩 Bangladesh</option>
              <option value="172129" className="bg-gray-700 text-gray-200">🇦🇫 Afghanistan</option>
            </optgroup>
            <optgroup label="Associate Nations" className="bg-gray-800 text-green-400">
              <option value="27" className="bg-gray-700 text-gray-200">🇮🇪 Ireland</option>
              <option value="172131" className="bg-gray-700 text-gray-200">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland</option>
              <option value="172133" className="bg-gray-700 text-gray-200">🇳🇱 Netherlands</option>
              <option value="172135" className="bg-gray-700 text-gray-200">🇳🇵 Nepal</option>
              <option value="172141" className="bg-gray-700 text-gray-200">🇦🇪 UAE</option>
              <option value="172143" className="bg-gray-700 text-gray-200">🇺🇸 USA</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
};