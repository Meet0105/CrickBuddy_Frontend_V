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
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
      <h2 className="text-xl font-bold text-green-400 mb-4">Filter Records</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Stats Type</label>
          <select 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          <label className="block text-sm font-medium text-gray-300 mb-1">Match Type</label>
          <select 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          <label className="block text-sm font-medium text-gray-300 mb-1">Team Filter</label>
          <select 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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