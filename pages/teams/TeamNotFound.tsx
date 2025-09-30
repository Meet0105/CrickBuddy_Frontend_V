import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export const TeamNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="text-5xl mb-4 text-green-400">🏏</div>
          <h3 className="text-xl font-bold text-white mb-2">Team Not Found</h3>
          <p className="text-gray-300 mb-4">The requested team could not be found.</p>
          <Link href="/teams" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
            Back to Teams
          </Link>
        </div>
      </main>
    </div>
  );
};