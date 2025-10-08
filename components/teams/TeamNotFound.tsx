import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export const TeamNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-gray-700/50">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6 text-green-400 animate-bounce">🏏</div>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">Team Not Found</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto">The requested team could not be found. It may have been removed or the link might be incorrect.</p>
          <Link href="/teams" className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl inline-block transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
            Back to Teams
          </Link>
        </div>
      </main>
    </div>
  );
};