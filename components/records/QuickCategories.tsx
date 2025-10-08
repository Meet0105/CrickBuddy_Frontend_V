import React from 'react';
import Link from 'next/link';

export const QuickCategories: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6">
      <Link href="/records?statsType=mostRuns&matchType=1" className="group bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 border border-gray-700/50 hover:border-green-500/50 transform hover:scale-105">
        <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">🏏</div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors">Most Runs</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Test Cricket</p>
      </Link>
      <Link href="/records?statsType=mostWickets&matchType=1" className="group bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 border border-gray-700/50 hover:border-green-500/50 transform hover:scale-105">
        <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">🎯</div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors">Most Wickets</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Test Cricket</p>
      </Link>
      <Link href="/records?statsType=highestScore&matchType=2" className="group bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 border border-gray-700/50 hover:border-green-500/50 transform hover:scale-105">
        <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">📈</div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors">Highest Scores</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">ODI Cricket</p>
      </Link>
      <Link href="/records?statsType=mostHundreds&matchType=1" className="group bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 border border-gray-700/50 hover:border-green-500/50 transform hover:scale-105">
        <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">💯</div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors">Most Centuries</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Test Cricket</p>
      </Link>
    </div>
  );
};