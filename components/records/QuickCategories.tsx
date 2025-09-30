import React from 'react';
import Link from 'next/link';

export const QuickCategories: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Link href="/records?statsType=mostRuns&matchType=1" className="bg-gray-800 rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition border border-gray-700">
        <div className="text-2xl mb-2">🏏</div>
        <h3 className="font-medium text-green-400">Most Runs</h3>
        <p className="text-xs text-gray-400">Test Cricket</p>
      </Link>
      <Link href="/records?statsType=mostWickets&matchType=1" className="bg-gray-800 rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition border border-gray-700">
        <div className="text-2xl mb-2">🎯</div>
        <h3 className="font-medium text-green-400">Most Wickets</h3>
        <p className="text-xs text-gray-400">Test Cricket</p>
      </Link>
      <Link href="/records?statsType=highestScore&matchType=2" className="bg-gray-800 rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition border border-gray-700">
        <div className="text-2xl mb-2">📈</div>
        <h3 className="font-medium text-green-400">Highest Scores</h3>
        <p className="text-xs text-gray-400">ODI Cricket</p>
      </Link>
      <Link href="/records?statsType=mostHundreds&matchType=1" className="bg-gray-800 rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition border border-gray-700">
        <div className="text-2xl mb-2">💯</div>
        <h3 className="font-medium text-green-400">Most Centuries</h3>
        <p className="text-xs text-gray-400">Test Cricket</p>
      </Link>
    </div>
  );
};