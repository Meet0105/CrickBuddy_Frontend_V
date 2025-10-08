import React from 'react';
import { Series } from '../../utils/series/seriesTypes';

interface SeriesInfoProps {
  series: Series;
}

export const SeriesInfo: React.FC<SeriesInfoProps> = ({ series }) => {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 lg:p-7 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-2 sm:mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Series Information
          </h3>
          <div className="space-y-2 sm:space-y-2.5">
            <div className="flex justify-between items-center p-2 sm:p-2.5 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Format:</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-200">{series.format}</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-2.5 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Type:</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-200">{series.seriesType}</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-2.5 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Status:</span>
              <span className={`text-xs sm:text-sm md:text-base font-bold px-2 py-0.5 rounded-full ${
                series.status === 'ONGOING' ? 'text-red-400 bg-red-900/30 animate-pulse' :
                series.status === 'UPCOMING' ? 'text-blue-400 bg-blue-900/30' :
                'text-gray-400'
              }`}>
                {series.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 p-2 sm:p-2.5 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Duration:</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-200 text-right">
                {new Date(series.startDate).toLocaleDateString()} - {new Date(series.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-2.5 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Matches:</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-green-400">{series.completedMatches} / {series.totalMatches}</span>
            </div>
            {series.venue.country && (
              <div className="flex justify-between items-center p-2 sm:p-2.5 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                <span className="text-xs sm:text-sm text-gray-400 font-medium">Country:</span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-200">{series.venue.country}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-2 sm:mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Teams
          </h3>
          <div className="space-y-2 sm:space-y-2.5">
            {series.teams.map((team) => (
              <div key={team.teamId} className="flex items-center gap-2 p-2.5 sm:p-3 md:p-3.5 bg-gray-750/80 hover:bg-gray-700/80 border border-gray-700/50 hover:border-green-500/30 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] group">
                <div className="w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse"></div>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-200 group-hover:text-green-300 transition-colors">{team.teamName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {series.description && (
        <div className="mb-4 sm:mb-5 md:mb-6 p-4 sm:p-5 bg-gray-900/30 rounded-lg sm:rounded-xl border border-gray-700/30">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-2 sm:mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">{series.description}</p>
        </div>
      )}
    </div>
  );
};