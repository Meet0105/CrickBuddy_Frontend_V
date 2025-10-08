import React from 'react';
import Link from 'next/link';
import { NewsItem } from '../../utils/teams/teamTypes';

interface NewsSectionProps {
  news: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return news && news.length > 0 ? (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 border border-gray-700/50">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        Team News
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {news.map((item, index) => (
          <Link
            key={item.id || index}
            href={`/news/${item.id}`}
            className="border-b border-gray-700/50 last:border-0 pb-3 sm:pb-4 last:pb-0 hover:bg-gray-700/50 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-200 cursor-pointer block group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-100 group-hover:text-green-400 transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 line-clamp-3">{item.summary}</p>
                <p className="text-xs text-gray-500 mt-1.5 sm:mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-green-400 ml-2 flex-shrink-0">
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
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-gray-700/50">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        Team News
      </h2>
      <p className="text-sm sm:text-base text-gray-400 italic text-center p-4">No recent news available for this team.</p>
    </div>
  );
};