import React from 'react';
import Link from 'next/link';

interface SeriesStatusProps {
  loading: boolean;
  error: string | null;
}

export const SeriesStatus: React.FC<SeriesStatusProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-400 mb-3 sm:mb-4"></div>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium animate-pulse">Loading series data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800/30 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base md:text-lg text-red-400 font-semibold mb-1">Error Loading Series</p>
            <p className="text-xs sm:text-sm text-red-300/80">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

interface SeriesNotFoundProps {
  seriesName?: string;
}

export const SeriesNotFound: React.FC<SeriesNotFoundProps> = ({ seriesName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-gray-700/50">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6 animate-bounce">🏆</div>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 mb-2 sm:mb-3">
            Series Not Found
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto">
            The requested series could not be found. It may have been removed or the link might be incorrect.
          </p>
          <Link href="/series" className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl inline-block transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
            Back to Series
          </Link>
        </div>
      </main>
    </div>
  );
};