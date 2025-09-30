import React from 'react';
import Link from 'next/link';
import { Result } from './utils/teamTypes';

interface ResultsSectionProps {
  results: Result[];
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  return results && results.length > 0 ? (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-100 mb-4">Recent Results</h2>
      <div className="space-y-3">
        {results.map((result, index) => (
          <Link
            key={result.matchId || index}
            href={`/matches/${result.matchId}`}
            className="border border-gray-700 rounded p-3 hover:bg-gray-700 hover:border-green-400 transition cursor-pointer block group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-100 group-hover:text-green-400">{result.title}</p>
                <p className="text-sm text-gray-400">{result.date} at {result.venue}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-600 bg-opacity-20 text-green-400 rounded">
                  {result.result}
                </span>
              </div>
              <div className="text-green-400 group-hover:text-green-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-100 mb-4">Recent Results</h2>
      <p className="text-gray-400">No recent results available for this team.</p>
    </div>
  );
};