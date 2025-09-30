import React from 'react';
import Link from 'next/link';

interface SeriesStatusProps {
  loading: boolean;
  error: string | null;
}

export const SeriesStatus: React.FC<SeriesStatusProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 mb-4">
        <p className="text-red-400">{error}</p>
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
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-gray-100 mb-2">Series Not Found</h3>
          <p className="text-gray-400 mb-4">The requested series could not be found.</p>
          <Link href="/series" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
            Back to Series
          </Link>
        </div>
      </main>
    </div>
  );
};