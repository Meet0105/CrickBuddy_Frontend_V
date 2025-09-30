import React from 'react';
import { NewsItem } from '../../utils/players/playerTypes';

interface PlayerNewsProps {
  news: NewsItem[];
}

export const PlayerNews: React.FC<PlayerNewsProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-green-300 mb-4">Player News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
            <h3 className="font-medium text-green-300">{item.title}</h3>
            <p className="text-sm text-green-200 mt-1">{item.summary}</p>
            <p className="text-xs text-green-400 mt-2">{new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};