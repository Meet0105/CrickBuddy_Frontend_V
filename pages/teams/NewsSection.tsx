import React from 'react';
import Link from 'next/link';
import { NewsItem } from './utils/teamTypes';

interface NewsSectionProps {
  news: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return news && news.length > 0 ? (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-100 mb-4">Team News</h2>
      <div className="space-y-4">
        {news.map((item, index) => (
          <Link
            key={item.id || index}
            href={`/news/${item.id}`}
            className="border-b border-gray-700 pb-4 last:border-0 last:pb-0 hover:bg-gray-700 p-2 rounded transition cursor-pointer block group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-100 group-hover:text-green-400">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.summary}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <div className="text-gray-400 group-hover:text-green-400 ml-2">
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
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-100 mb-4">Team News</h2>
      <p className="text-gray-400">No recent news available for this team.</p>
    </div>
  );
};