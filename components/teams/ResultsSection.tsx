import React from 'react';
import Link from 'next/link';
import { Result } from '../../utils/teams/teamTypes';

interface ResultsSectionProps {
  results: Result[];
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  return results && results.length > 0 ? (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Results
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {results.map((result, index) => (
          <Link
            key={result.matchId || index}
            href={`/matches/${result.matchId}`}
            className="border border-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 hover:border-green-400/50 transition-all duration-200 transform hover:scale-[1.01] cursor-pointer block group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-100 group-hover:text-green-400 transition-colors line-clamp-2">{result.title}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-1.5">{result.date} at {result.venue}</p>
                <span className="inline-block mt-1.5 sm:mt-2 px-2 sm:px-2.5 py-1 text-xs sm:text-sm bg-green-600/20 text-green-400 rounded-full font-semibold">
                  {result.result}
                </span>
              </div>
              <div className="text-green-400 group-hover:text-green-300 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Results
      </h2>
      <p className="text-sm sm:text-base text-gray-400 italic text-center p-4">No recent results available for this team.</p>
    </div>
  );
};